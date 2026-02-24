# tenants/constants.py

class TenantSettingKeys:
    # Branding Settings
    LOGO_URL = "logo_url"
    PRIMARY_COLOR = "primary_color"
    COMPANY_ADDRESS = "company_address"
    
    # Shipment & Delivery Rules
    MAX_DELIVERY_ATTEMPTS = "max_delivery_attempts"  # Ref: 
    ALLOW_CANCELLATION_AFTER_PICKUP = "allow_cancel_after_pickup"
    DEFAULT_CURRENCY = "default_currency"
    
    # Financial Rules
    MIN_PAYOUT_THRESHOLD = "min_payout_threshold"  # Ref: [cite: 169]

    @classmethod
    def choices(cls):
        return [
            (value, key) for key, value in cls.__dict__.items() 
            if not key.startswith("__") and not callable(value)
        ]