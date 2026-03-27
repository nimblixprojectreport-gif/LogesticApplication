import uuid
from django.db import models
from django.contrib.auth.models import User


class Shipment(models.Model):

    class Status(models.TextChoices):
        CREATED = "Created"
        ASSIGNED = "Assigned"
        PICKED_UP = "Picked Up"
        IN_TRANSIT = "In Transit"
        OUT_FOR_DELIVERY = "Out for Delivery"
        DELIVERED = "Delivered"
        CANCELLED = "Cancelled"
        DELIVERY_FAILED = "Delivery Failed"
        RTO = "RTO"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tracking_number = models.CharField(max_length=100, unique=True)

    customer_name = models.CharField(max_length=255)
    customer_phone = models.CharField(max_length=20)

    pickup_address = models.TextField()
    delivery_address = models.TextField()

    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.CREATED
    )

    driver = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tracking_number