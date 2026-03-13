"""
URL configuration for logestics project.

The `urlpatterns` list routes URLs to views.
For more information please see:
https://docs.djangoproject.com/en/6.0/topics/http/urls/
"""

from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include


urlpatterns = [
    
    # Django Admin
    path('admin/', admin.site.urls),

    # Earnings APIs
    path('api/', include('earnings.urls')),

    # Chatbot APIs
    path('api/chatbot/', include('chatbot.urls')),

    # Shipments APIs
    path('api/shipments/', include('shipments.urls')),

    # Optional redirect for home page
    # path('', lambda request: redirect('tracking-index')),

    # Future modules (currently commented)
    # path('api/drivers/', include('drivers.urls')),
    # path('api/auth/', include('auth_system.urls')),
    path('api/earnings/', include('earnings.urls')),
    # path('api/tracking/', include('tracking.urls')),
    # path('api/parcelmanagement/', include('parcelmanagement.urls')),
    # path('api/logestics/', include('shipment.urls')),
    # path('api/payments/', include('payments.urls')),
]