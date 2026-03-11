from shipments.models import Shipment


def get_delivery_time(tracking_number):

    try:

        shipment = Shipment.objects.get(tracking_number=tracking_number)

        if shipment.status == "Delivered":
            return "Your package has already been delivered."

        elif shipment.status == "Out for Delivery":
            return "Your package will arrive today."

        elif shipment.status == "In Transit":
            return "Your package is in transit and will arrive soon."
        return f"Current status: {shipment.status}"

    except Shipment.DoesNotExist:

        return "Shipment not found."