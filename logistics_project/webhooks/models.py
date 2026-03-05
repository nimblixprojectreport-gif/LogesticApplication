from django.db import models

# Create your models here.
class Webhook(models.Model):
    EVENT_CHOICES = [
        ('shipment_status_changed', 'Shipment Status Changed'),
        ('payment_updated', 'Payment Updated'),
        ('payout_processed', 'Payout Processed'),
    ]
    url=models.URLField()
    event=models.CharField(max_length=50,choices=EVENT_CHOICES)
    is_active=models.BooleanField(default=True)