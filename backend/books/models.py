from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    price = models.IntegerField()
    image = models.URLField()
    pdf = models.CharField(max_length=300)
    pages = models.IntegerField()
    ratings = models.FloatField()
    aboutAuthor = models.TextField()
    preview = models.TextField()

    def __str__(self):
        return self.title