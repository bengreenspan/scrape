from django import forms
from multiupload.fields import MultiFileField


class PDFUploadForm(forms.Form):
    pdf_files = MultiFileField(max_num=None, min_num=1)


class ChatForm(forms.Form):
    question = forms.CharField(label="Question", max_length=500,
                               widget=forms.TextInput(
                                   attrs={'placeholder': "What is this document about?"})
                               )
