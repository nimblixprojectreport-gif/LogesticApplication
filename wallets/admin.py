from django.contrib import admin
from django.db import transaction
from .models import Wallet, WalletTransaction


@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ['user', 'balance', 'created_at']


@admin.register(WalletTransaction)
class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = ['wallet', 'transaction_type', 'amount', 'status', 'created_at']
    list_filter = ['transaction_type', 'status']

    def save_model(self, request, obj, form, change):
        """
        When admin changes status from PENDING to APPROVED,
        automatically deduct wallet balance.
        """

        if change:
            old_obj = WalletTransaction.objects.get(pk=obj.pk)

            # If status changed from PENDING to APPROVED
            if (
                old_obj.status == 'PENDING' and
                obj.status == 'APPROVED' and
                obj.transaction_type == 'WITHDRAW'
            ):
                wallet = obj.wallet

                if wallet.balance >= obj.amount:
                    with transaction.atomic():
                        wallet.balance -= obj.amount
                        wallet.save()
                else:
                    obj.status = 'REJECTED'

        super().save_model(request, obj, form, change)