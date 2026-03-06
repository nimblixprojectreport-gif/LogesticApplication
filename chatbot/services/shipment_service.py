from shipments.models import Shipment
from tracking.models import TrackingLog


def track_shipment(tracking_number):

    try:

        shipment = Shipment.objects.get(tracking_number=tracking_number)

        latest_log = shipment.tracking_logs.last()

        if latest_log:
            return f"""
Tracking Number: {shipment.tracking_number}
Current Status: {shipment.status}
Last Update: {latest_log.status}
Updated At: {latest_log.timestamp}
"""
        else:
            return f"Shipment {shipment.tracking_number} status: {shipment.status}"

    except Shipment.DoesNotExist:

        return "Shipment not found. Please check tracking number."