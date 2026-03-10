from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.permissions import AllowAny, IsAdminUser

from django.db import transaction
from decimal import Decimal

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from django.contrib.auth.models import User

from .models import Wallet, WalletTransaction
from .serializers import WalletSerializer, WalletTransactionSerializer


# -------------------------------------------------
# HTML WALLET DASHBOARD (Django template)
# -------------------------------------------------
@login_required
def wallet_dashboard(request):
    wallet, _ = Wallet.objects.get_or_create(user=request.user)
    transactions = wallet.transactions.all().order_by('-created_at')

    return render(request, "wallets/dashboard.html", {
        "wallet": wallet,
        "transactions": transactions
    })


# -------------------------------------------------
# HTML TOPUP
# -------------------------------------------------
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


# -------------------------------------------------
# HTML WITHDRAW
# -------------------------------------------------
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


# -------------------------------------------------
# API: GET WALLET BALANCE
# -------------------------------------------------
class WalletDetailView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        user = User.objects.first()  # temporary user

        wallet, _ = Wallet.objects.get_or_create(user=user)

        return Response(WalletSerializer(wallet).data)


# -------------------------------------------------
# API: TOPUP WALLET
# -------------------------------------------------
@method_decorator(csrf_exempt, name='dispatch')
class TopUpView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        amount = Decimal(request.data.get("amount"))

        user = User.objects.first()

        wallet, _ = Wallet.objects.get_or_create(user=user)

        wallet.balance += amount
        wallet.save()

        WalletTransaction.objects.create(
            wallet=wallet,
            transaction_type="TOPUP",
            amount=amount,
            status="APPROVED"
        )

        return Response({"message": "Topup successful"})


# -------------------------------------------------
# API: WITHDRAW REQUEST
# -------------------------------------------------
@method_decorator(csrf_exempt, name='dispatch')
class WithdrawRequestView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        amount = Decimal(request.data.get("amount"))

        user = User.objects.first()

        wallet, _ = Wallet.objects.get_or_create(user=user)

        if wallet.balance < amount:
            return Response(
                {"error": "Insufficient balance"},
                status=status.HTTP_400_BAD_REQUEST
            )

        WalletTransaction.objects.create(
            wallet=wallet,
            transaction_type="WITHDRAW",
            amount=amount,
            status="PENDING"
        )

        return Response({"message": "Withdraw request sent"})


# -------------------------------------------------
# ADMIN APPROVE WITHDRAW
# -------------------------------------------------
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

            return Response(
                {"error": "Transaction not found"},
                status=404
            )

        wallet = txn.wallet

        if wallet.balance < txn.amount:

            txn.status = 'REJECTED'
            txn.save()

            return Response(
                {"error": "Insufficient balance"},
                status=400
            )

        wallet.balance -= txn.amount
        wallet.save()

        txn.status = 'APPROVED'
        txn.save()

        return Response({"message": "Withdrawal approved successfully"})


# -------------------------------------------------
# API: TRANSACTION HISTORY
# -------------------------------------------------
class TransactionHistoryView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        user = User.objects.first()

        wallet, _ = Wallet.objects.get_or_create(user=user)

        txns = wallet.transactions.all().order_by('-created_at')

        return Response(WalletTransactionSerializer(txns, many=True).data)