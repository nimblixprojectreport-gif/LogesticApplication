from rest_framework.exceptions import ValidationError
from .models import Shipment


ALLOWED_TRANSITIONS = {
    "Created": ["Assigned", "Cancelled"],
    "Assigned": ["Picked Up", "Cancelled"],
    "Picked Up": ["In Transit"],
    "In Transit": ["Out for Delivery"],
    "Out for Delivery": ["Delivered", "Delivery Failed"],
    "Delivery Failed": ["Out for Delivery", "RTO"],
}


class ShipmentService:

    @staticmethod
    def update_status(shipment, new_status):
        current = shipment.status

        if new_status not in ALLOWED_TRANSITIONS.get(current, []):
            raise ValidationError("Invalid status transition")

        shipment.status = new_status
        shipment.save()

    @staticmethod
    def assign_driver(shipment, driver):
        if shipment.status != Shipment.Status.CREATED:
            raise ValidationError("Driver can only be assigned in Created state")

        shipment.driver = driver
        shipment.status = Shipment.Status.ASSIGNED
        shipment.save()

    @staticmethod
    def cancel_shipment(shipment):
        if shipment.status == Shipment.Status.DELIVERED:
            raise ValidationError("Cannot cancel delivered shipment")

        shipment.status = Shipment.Status.CANCELLED
        shipment.save()

    @staticmethod
    def mark_rto(shipment):
        shipment.status = Shipment.Status.RTO
        shipment.save()