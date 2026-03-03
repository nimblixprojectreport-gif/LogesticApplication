from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db import transaction
from decimal import Decimal
from .models import Wallet, WalletTransaction
from .serializers import WalletSerializer, WalletTransactionSerializer
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from decimal import Decimal
from rest_framework import status
from rest_framework.permissions import IsAdminUser

@login_required
def wallet_dashboard(request):
    wallet, _ = Wallet.objects.get_or_create(user=request.user)
    transactions = wallet.transactions.all().order_by('-created_at')
    return render(request, "wallets/dashboard.html", {
        "wallet": wallet,
        "transactions": transactions
    })


@login_required
def topup_html(request):
    if request.method == "POST":
        amount = Decimal(request.POST.get("amount"))
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        wallet.balance += amount
        wallet.save()

        WalletTransaction.objects.create(
            wallet=wallet,
            transaction_type='TOPUP',
            amount=amount,
            status='APPROVED'
        )
    return redirect('wallet-dashboard')


@login_required
def withdraw_html(request):
    if request.method == "POST":
        amount = Decimal(request.POST.get("amount"))
        wallet, _ = Wallet.objects.get_or_create(user=request.user)

        if wallet.balance >= amount:
            WalletTransaction.objects.create(
                wallet=wallet,
                transaction_type='WITHDRAW',
                amount=amount,
                status='PENDING'
            )

    return redirect('wallet-dashboard')

class WalletDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        return Response(WalletSerializer(wallet).data)

class TopUpView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    @transaction.atomic
    def post(self, request):
        amount = Decimal(request.data.get("amount"))
        if amount <= 0:
            return Response({"error": "Invalid amount"}, status=400)
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        wallet.balance += amount
        wallet.save()
        WalletTransaction.objects.create(wallet=wallet, transaction_type='TOPUP', amount=amount, status='APPROVED')
        return Response({"message": "Top-up successful"})

class WithdrawRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        amount = Decimal(request.data.get("amount"))
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        if wallet.balance < amount:
            return Response({"error": "Insufficient balance"}, status=400)
        WalletTransaction.objects.create(wallet=wallet, transaction_type='WITHDRAW', amount=amount, status='PENDING')
        return Response({"message": "Withdrawal request submitted"})

class ApproveWithdrawView(APIView):
    permission_classes = [IsAdminUser]

    @transaction.atomic
    def post(self, request, pk):
        try:
            txn = WalletTransaction.objects.select_for_update().get(
                id=pk,
                transaction_type='WITHDRAW',
                status='PENDING'
            )
        except WalletTransaction.DoesNotExist:
            return Response({"error": "Transaction not found"}, status=404)

        wallet = txn.wallet

        # Reduce balance
        if wallet.balance < txn.amount:
            txn.status = 'REJECTED'
            txn.save()
            return Response({"error": "Insufficient balance"}, status=400)

        wallet.balance = wallet.balance - txn.amount
        wallet.save()

        txn.status = 'APPROVED'
        txn.save()

        return Response({"message": "Withdrawal approved successfully"})

class TransactionHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        txns = wallet.transactions.all().order_by('-created_at')
        return Response(WalletTransactionSerializer(txns, many=True).data)