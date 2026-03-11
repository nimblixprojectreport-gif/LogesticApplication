def detect_intent(message):

    message = message.lower()
    
    # track_keywords = [
    #     "track", 
    #     "where is my package", 
    #     "shipment status", 
    #     "track order"
    #     ] 
    
    # delivery_keywords = [
    #     "delivery time", 
    #     "when will my package arrive", 
    #     "eta"
    #     ]
    
    # driver_keywords = [
    #     "call driver", 
    #     "driver phone", 
    #     "contact driver"
    #     ]
    
    # damaged_keywords = [
    #     "package damaged", 
    #     "parcel broken"
    #     ]
    
    # delay_keywords = [
    #     "driver not arrived", 
    #     "delivery delay"
    #     ]
    
    # address_keywords = [
    #     "wrong address", 
    #     "change address"
    #     ]
    
    # for word in track_keywords:
    #     if word in message:
    #         return "track_shipment"
        
    # for word in delivery_keywords:
    #     if word in message:
    #         return "delivery_time"
        
    # for word in driver_keywords:
    #     if word in message:
    #         return "driver_contact"
        
    # for word in damaged_keywords:
    #     if word in message:
    #         return "package_damaged"
        
    # for word in delay_keywords:  
    #     if word in message:
    #         return "driver_delay"  

    # for word in address_keywords:  
    #     if word in message:
    #         return "wrong_address"  

    # return "unknown"

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