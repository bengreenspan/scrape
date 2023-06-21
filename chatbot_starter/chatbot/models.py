from django.db import models


class Message(models.Model):
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return self.question
