# holidays/models.py
from django.db import models

class Holiday(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    holiday_date = models.DateField()
    country = models.CharField(max_length=2)
    year = models.IntegerField()

    def __str__(self):
        return self.name

