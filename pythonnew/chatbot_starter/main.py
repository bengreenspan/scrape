import os
from django.core.wsgi import get_wsgi_application
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.conf import settings
from django import forms
from dotenv import load_dotenv


# Load Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatbot_starter.settings')
load_dotenv()

# Initialize Django application
application = get_wsgi_application()

# Function to run the Django application


def run_app():
    from django.core.management import call_command

    # Apply migrations
    call_command('makemigrations', interactive=False)
    call_command('migrate', interactive=False)

    # Collect static files
    call_command('collectstatic', '--noinput')

    # Run Django application
    call_command('runserver', 'localhost:8200')


if __name__ == "__main__":
    run_app()
