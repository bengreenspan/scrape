import os
import tempfile
from django.shortcuts import render, redirect
from .forms import PDFUploadForm, ChatForm
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain.vectorstores import Pinecone
from langchain.memory import ConversationBufferMemory
from langchain.chains.question_answering import load_qa_chain
from langchain.chains import LLMChain
import pinecone
from chatbot.forms import PDFUploadForm
from chatbot.utils.prompts import CONDENSE_QUESTION_PROMPT, QA_PROMPT
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import HttpResponseServerError


def ingest_docs(temp_dir: str = tempfile.gettempdir()):
    try:
        # Load PDF files from the temporary directory
        loader = DirectoryLoader(
            temp_dir, glob="**/*.pdf", loader_cls=PyPDFLoader, recursive=True
        )
        temp_documents = loader.load()

        # Split documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=100)
        documents = text_splitter.split_documents(temp_documents)

        # Initialize Pinecone with credentials
        pinecone.init(
            api_key=settings.PINECONE_API_KEY, environment=settings.PINECONE_ENVIRONMENT
        )

        # Initialize OpenAIEmbeddings with credentials
        embeddings = OpenAIEmbeddings(
            model='text-embedding-ada-002', openai_api_key=settings.OPENAI_API_KEY
        )

        # Ingest documents into Pinecone vectorstore
        Pinecone.from_documents(
            documents, embeddings, index_name=settings.PINECONE_INDEX, namespace=settings.PINECONE_NAMESPACE
        )
    except Exception as e:
        return HttpResponseServerError(
            f"An error occurred whilst ingesting your files: {str(e)}")


@csrf_exempt
def home_view(request):
    form = PDFUploadForm()
    # Display a warning if the user has not set their credentials
    if not settings.OPENAI_API_KEY or not settings.PINECONE_API_KEY or not settings.PINECONE_ENVIRONMENT \
            or not settings.PINECONE_INDEX or not settings.PINECONE_NAMESPACE:
        warning_message = "Please set your credentials in the settings.py file to use this app."
        return render(request, 'home.html', {
                      'warning_message': warning_message, 'form': form})

    # Handle file uploads
    if request.method == 'POST' and request.FILES:
        uploaded_files = request.FILES.getlist('uploaded_files')

        # Create a temporary directory to store the uploaded files
        with tempfile.TemporaryDirectory() as temp_dir:
            try:
                for uploaded_file in uploaded_files:
                    file_name = uploaded_file.name
                    # Save the file to the temporary directory
                    with open(os.path.join(temp_dir, file_name), "wb") as f:
                        f.write(uploaded_file.read())

                # Ingest the uploaded documents into Pinecone vectorstore
                ingest_docs(temp_dir)

                # Return a success response
                success_message = "Your file(s) have been successfully ingested"
                return redirect('/chat', success_message='success_message')

            except Exception as e:
                error_message = f"An error occurred whilst uploading your files: {str(e)}"
                return render(request, 'home.html', {
                              'error_message': error_message, 'form': form})

    # Render the upload HTML template
    return render(request, 'home.html', {'form': form})


@csrf_exempt
def chat_view(request):
    form = ChatForm()
    if request.method == "POST":
        # Logic to handle user and bot messages
        # Initialize history if it doesn't exist
        if 'chat_history' not in request.session:
            request.session['chat_history'] = []
        # Initialize ready state if it doesn't exist
        ready = request.session.get('ready', True)
        if ready:
            # initialize Pinecone with credentials
            pinecone.init(
                api_key=settings.PINECONE_API_KEY, environment=settings.PINECONE_ENVIRONMENT
            )
            # initialize OpenAIEmbeddings and chat models with credentials
            embeddings = OpenAIEmbeddings(
                model="text-embedding-ada-002", openai_api_key=settings.OPENAI_API_KEY
            )
            # change model to gpt-4 if you have access to the API
            llm = ChatOpenAI(
                model_name="gpt-3.5-turbo",
                temperature=0,
                openai_api_key=settings.OPENAI_API_KEY,
                verbose=True,
            )
            # initialize memory
            memory = ConversationBufferMemory(
                memory_key="chat_history", return_messages=True
            )
            # initialize retrieval chain
            vectorstore = Pinecone.from_existing_index(
                index_name=settings.PINECONE_INDEX,
                embedding=embeddings,
                text_key="text",
                namespace=settings.PINECONE_NAMESPACE,
            )
            retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
            question_generator = LLMChain(
                llm=llm, prompt=CONDENSE_QUESTION_PROMPT, verbose=True
            )
            doc_chain = load_qa_chain(
                llm, chain_type="stuff", prompt=QA_PROMPT, verbose=True
            )
            qa = ConversationalRetrievalChain(
                retriever=retriever,
                question_generator=question_generator,
                combine_docs_chain=doc_chain,
                verbose=True,
                memory=memory,
            )
            if 'generated' not in request.session:
                request.session['generated'] = [
                    "What would you like to learn about the document?"]
            if 'past' not in request.session:
                request.session['past'] = ["Hey!"]
            user_input = request.POST.get("question")
            if user_input:
                output = qa({"question": user_input})
                # Update chat history with user input and bot response
                request.session['past'].append(user_input)
                request.session['generated'].append(output['answer'])
                request.session['chat_history'].append(
                    {"question": user_input, "answer": output['answer']})
        return render(request, 'chat.html',
                      {
                          'messages': zip(
                              request.session['past'],
                              request.session['generated']
                          ),
                          'form': form
                      })
    return render(request, 'chat.html', {'form': form})
