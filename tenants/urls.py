from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, TenantSettingViewSet

# Initialize the DRF router
router = DefaultRouter()
# Super Admin route: /tenants/
router.register(r'tenants', TenantViewSet, basename='tenant')

# Tenant Admin route: /tenant/settings/
router.register(r'tenant/settings', TenantSettingViewSet, basename='tenant-settings')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
]