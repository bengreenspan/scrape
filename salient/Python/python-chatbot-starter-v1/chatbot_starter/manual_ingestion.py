from langchain.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
import pinecone
from dotenv import load_dotenv
import os

# load your credentials from .env file
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
pinecone_api_key = os.getenv("PINECONE_API_KEY")
pinecone_environment = os.getenv("PINECONE_ENVIRONMENT")
pinecone_index = os.getenv("PINECONE_INDEX_NAME")
pinecone_namespace = os.getenv("PINECONE_NAMESPACE")

"""
Ingest your documents into Pinecone vectorstore
"""

folder_path = 'docs'  # path to folder containing documents to ingest


def ingest_docs():
    # throw error if openai_api_key is not set
    if not openai_api_key:
        raise ValueError("Please set OPENAI_API_KEY in .env file.")

    try:
        # load documents from folder
        loader = DirectoryLoader(
            folder_path, glob="**/*.pdf", loader_cls=PyPDFLoader, recursive=True
        )
        docs = loader.load()

        # split documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=100)

        split_docs = text_splitter.split_documents(docs)

        embeddings = OpenAIEmbeddings(
            model='text-embedding-ada-002', openai_api_key=openai_api_key)

        pinecone.init(
            api_key=pinecone_api_key, environment=pinecone_environment)
        Pinecone.from_documents(
            split_docs, embeddings, index_name=pinecone_index, namespace=pinecone_namespace)
        return "Documents ingested into Pinecone vectorstore."
    except Exception as e:
        print(f"An error occurred whilst ingesting your files: {str(e)}")


if __name__ == "__main__":
    ingest_docs()
