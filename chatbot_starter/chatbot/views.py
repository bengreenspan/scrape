from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import tempfile
import os
from .forms import PDFUploadForm, ChatForm
from .utils.docs import ingest_docs, process_docs


@csrf_exempt
def main_view(request):
    upload_form = PDFUploadForm()
    message_form = ChatForm()

    # Display a warning if the user has not set their credentials
    if not settings.OPENAI_API_KEY or not settings.PINECONE_API_KEY or not settings.PINECONE_ENVIRONMENT \
            or not settings.PINECONE_INDEX or not settings.PINECONE_NAMESPACE:
        warning_message = "Please set your credentials in the settings.py file to use this app."
        return render(request, 'main.html', {
                      'warning_message': warning_message,
                      'upload_form': upload_form,
                      'message_form': message_form
                      })

    # Handle file uploads
    if request.method == 'POST' and request.FILES:
        uploaded_files = request.FILES.getlist('pdf_files')
        print("-", request.FILES)
        print("--", uploaded_files)
        # Create a temporary directory to store the uploaded files
        with tempfile.TemporaryDirectory() as temp_dir:
            try:
                print("here")
                for uploaded_file in uploaded_files:
                    file_name = uploaded_file.name
                    print("==>", file_name)
                    # Save the file to the temporary directory
                    with open(os.path.join(temp_dir, file_name), "wb") as f:
                        f.write(uploaded_file.read())

                # Ingest the uploaded documents into Pinecone vectorstore
                ingest_docs(temp_dir)

                # Return a success response
                success_message = "Your file(s) have been successfully ingested"
                return render(request, 'main.html', {
                              'success_message': success_message,
                              'upload_form': upload_form,
                              'message_form': message_form
                              })
            except Exception as e:
                error_message = f"An error occurred whilst uploading your files: {str(e)}"
                return render(request, 'main.html', {
                              'error_message': error_message,
                              'upload_form': upload_form,
                              'message_form': message_form
                              })
    # Render the chat
    elif request.method == "POST" and 'question' in request.POST:
        user_input = request.POST.get("question")
        # Logic to handle user and bot messages
        # Initialize history if it doesn't exist
        if 'chat_history' not in request.session:
            request.session['chat_history'] = []
        # Initialize ready state if it doesn't exist
        ready = request.session.get('ready', True)
        if ready:
            qa = process_docs()
            if 'generated' not in request.session:
                request.session['generated'] = [
                    "What would you like to learn about the document?"]
            if 'past' not in request.session:
                request.session['past'] = ["Hey!"]
            if user_input:
                output = qa({"question": user_input})
                # Update chat history with user input and bot response
                request.session['past'].append(user_input)
                request.session['generated'].append(output['answer'])
                request.session['chat_history'].append(
                    {"question": user_input, "answer": output['answer']})

        return render(request, 'main.html',
                      {
                          'messages': zip(
                              request.session['past'],
                              request.session['generated']
                          ),
                          'upload_form': upload_form,
                          'message_form': message_form
                      })
    return render(request, 'main.html',
                  {
                      'upload_form': upload_form,
                      'message_form': message_form
                  })
