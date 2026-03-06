def detect_intent(message):

    message = message.lower()

    if "track" in message or "where is my package" in message:
        return "track_shipment"

    elif "delivery time" in message or "when will my package arrive" in message:
        return "delivery_time"

    elif "call driver" in message or "driver phone" in message:
        return "driver_contact"

    elif "package damaged" in message:
        return "package_damaged"

    elif "driver not arrived" in message:
        return "driver_delay"

    elif "wrong address" in message:
        return "wrong_address"

    return "unknown"