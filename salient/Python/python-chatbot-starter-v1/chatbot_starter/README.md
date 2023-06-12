# AI chatbot starter kit (Python)

This is a Python Django application that allows you to load PDF file(s) and chat with your docs.


## Installation

Prelude:
a. Make sure you have [Python installed on your system](https://www.python.org/downloads/)

1. (optional) Set up a Python virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows script to activate virtual environment:

```bash
.venv\scripts\activate
```

2. Run the script below in your terminal to install required dependencies in your virtual environment

```
pip install -r requirements.txt
```

3. Copy the `example.env` file into a `.env` and fill in your credentials

## Usage

4. Run the django web app

```
python3 manage.py tailwind start
python3 main.py
```

A new server should run locally. To stop the django server press `ctrl-C`

## Folder structure

- `docs`: Insert your pdf files in this folder.
- `.env`: After creating this file, add your credentials including the pinecone namespace and environment.
- `utils`: Change the prompts sent to the model to generate outputs in `prompts.py`
- `manual_ingestion.py`: If you would prefer to perform the ingestion of your PDF files manually instead of via the UI, run `python3 manual_ingestion.py.` Once the ingestion is complete and added to a namespace, you can use the django app to chat with your data without uploading files.

## Deployment

