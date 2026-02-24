from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Tenant
from wallet.models import Wallet 

@receiver(post_save, sender=Tenant)
def create_tenant_wallet(sender, instance, created, **kwargs):
    """
    Automatically creates a Wallet when a new Tenant is registered.
    """
    if created:
        Wallet.objects.create(
            tenant=instance,
            balance=0.00,
            currency="USD" 
        )