from django.db import models

# Create your models here.
class vehicle(models.Model):
    name=models.CharField(max_length=100)
    number=models.CharField(max_length=50)
    type=models.CharField(max_length=50)
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name