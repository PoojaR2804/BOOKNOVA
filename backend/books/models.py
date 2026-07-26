from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    price = models.IntegerField()
    image = models.URLField()

    viewLink = models.URLField()
    downloadLink = models.CharField(max_length=300)
    preview = models.TextField()
    pages = models.IntegerField()
    ratings = models.FloatField()
    aboutAuthor = models.TextField()

    def __str__(self):
        return self.title