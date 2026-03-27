from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShipmentViewSet, dashboard

router = DefaultRouter()
router.register(r'shipments', ShipmentViewSet, basename='shipment')

urlpatterns = [
    path('', dashboard, name='dashboard'),      # Homepage
    path('api/', include(router.urls)),         # API
]