from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services.intent_detection import detect_intent
from .services.shipment_service import track_shipment
from .services.delivery_service import get_delivery_time
from .services.driver_service import get_driver_contact
from .services.support_service import report_issue


@api_view(["POST"])
def chatbot_api(request):

    message = request.data.get("message")
    tracking_number = request.data.get("tracking_number")
    driver_id = request.data.get("driver_id")

    intent = detect_intent(message)

    if intent == "track_shipment":

        response = track_shipment(tracking_number)

    elif intent == "delivery_time":

        response = get_delivery_time(tracking_number)

    elif intent == "driver_contact":

        response = get_driver_contact(driver_id)

    elif intent in ["package_damaged", "driver_delay", "wrong_address"]:

        response = report_issue(intent)

    else:

        response = "Sorry, I didn't understand your request."

    return Response({
        "intent": intent,
        "response": response
    })
    
    
    