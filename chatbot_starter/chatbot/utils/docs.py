from django.conf import settings
from django.http import HttpResponseServerError
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
import tempfile
from .prompts import CONDENSE_QUESTION_PROMPT, QA_PROMPT

# Initialize Pinecone with credentials
pinecone.init(
    api_key=settings.PINECONE_API_KEY, environment=settings.PINECONE_ENVIRONMENT
)

# Initialize OpenAIEmbeddings with credentials
embeddings = OpenAIEmbeddings(
    model='text-embedding-ada-002', openai_api_key=settings.OPENAI_API_KEY
)


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

        # Ingest documents into Pinecone vectorstore
        Pinecone.from_documents(
            documents,
            embeddings,
            index_name=settings.PINECONE_INDEX,
            namespace=settings.PINECONE_NAMESPACE
        )
    except Exception as e:
        return HttpResponseServerError(
            f"An error occurred whilst ingesting your files: {str(e)}")


def process_docs():
    try:
        # initializes OpenAI's text embedding model and a chat model (GPT-3) with API credentials.
        # change model to gpt-4 if you have access to the API
        llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            temperature=0,
            openai_api_key=settings.OPENAI_API_KEY,
            verbose=True,
        )
        # initializes a memory component to store conversation history.
        memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
        # initializes a retrieval chain to retrieve relevant documents from the
        # vector database.
        vectorstore = Pinecone.from_existing_index(
            index_name=settings.PINECONE_INDEX,
            embedding=embeddings,
            text_key="text",
            namespace=settings.PINECONE_NAMESPACE,
        )
        retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
        # initializes a question generator using the GPT-3 model.
        question_generator = LLMChain(
            llm=llm, prompt=CONDENSE_QUESTION_PROMPT, verbose=True
        )
        # initializes a chain to generate answers from documents.
        doc_chain = load_qa_chain(
            llm, chain_type="stuff", prompt=QA_PROMPT, verbose=True
        )
        # initializes the full conversational retrieval chain using the
        # components above.
        qa = ConversationalRetrievalChain(
            retriever=retriever,
            question_generator=question_generator,
            combine_docs_chain=doc_chain,
            verbose=True,
            memory=memory,
        )
        return qa
    except Exception as e:
        return HttpResponseServerError(
            f"An error occurred whilst processing your files: {str(e)}")
