from rest_framework import serializers
from .models import TenantSetting, Tenant
from .constants import TENANT_SETTING_CHOICES

class TenantSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tenant
        fields = ['name', 'domain', 'is_active', 'slug', 'contact_email']
        read_only_fields=['id','created_at','updated_at']

class TenantSettingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TenantSetting
        fields = ['key', 'value']
        read_only_fields=['id','created_at']

def validate_key(self, value):
    valid_keys =[choice[0] for choice in TENANT_SETTING_CHOICES]
    if value not in valid_keys:
        raise serializers.ValidationError(f"Invalid key. Valid keys are: {valid_keys}")
    return value
