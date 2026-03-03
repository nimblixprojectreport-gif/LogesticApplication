from django.urls import path
from .views import *
from .views import wallet_dashboard, topup_html, withdraw_html



urlpatterns = [
    path('wallet/', WalletDetailView.as_view()),
    path('wallet/topup/', TopUpView.as_view()),
    path('wallet/withdraw/', WithdrawRequestView.as_view()),
    path('wallet/transactions/', TransactionHistoryView.as_view()),
    path('admin/approve-withdraw/<int:pk>/', ApproveWithdrawView.as_view()),
    path('dashboard/', wallet_dashboard, name='wallet-dashboard'),
    path('topup-html/', topup_html, name='topup-html'),
    path('withdraw-html/', withdraw_html, name='withdraw-html'),
]