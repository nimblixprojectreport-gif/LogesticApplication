from django.db import models
from core.models import TimeStampedModel
from .constants import TENANT_SETTING_CHOICES
from django.conf import settings

class Tenant(TimeStampedModel):
    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    slug=models.SlugField(max_length=255, unique=True)
    contact_email=models.EmailField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class TenantSetting(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    key = models.CharField(max_length=100, choices=TENANT_SETTING_CHOICES)
    value = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("tenant", "key")
    

class AuditLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True)
    action = models.CharField(max_length=50)  # e.g., 'CREATE', 'UPDATE'
    resource = models.CharField(max_length=100) # e.g., 'Tenant', 'TenantSetting'
    resource_id = models.CharField(max_length=255, null=True)
    changes = models.JSONField(null=True, blank=True) # To store old vs new values
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']