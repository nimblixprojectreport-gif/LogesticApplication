from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Tenant, TenantSetting, AuditLog
from .serializers import TenantSerializer, TenantSettingSerializer

# 1. Custom Permission for Super Admin
class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        return 'Super Admin' in user.role_names

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [IsSuperAdmin] 

    def perform_create(self, serializer):
        # Save the new Tenant
        tenant = serializer.save()
        
        # Log Tenant Creation (Critical Action)
        AuditLog.objects.create(
            user=self.request.user,
            action="CREATE",
            resource="Tenant",
            resource_id=str(tenant.id),
            details={"name": tenant.name, "domain": tenant.domain}
        )

class TenantSettingViewSet(viewsets.ModelViewSet):
    serializer_class = TenantSettingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return TenantSetting.objects.filter(tenant=user.tenant)

    def perform_create(self, serializer):
        # 1. Auto-assign tenant and save
        setting = serializer.save(tenant=self.request.user.tenant)
        
        # 2. Log Setting Creation
        AuditLog.objects.create(
            user=self.request.user,
            tenant=self.request.user.tenant,
            action="CREATE",
            resource="TenantSetting",
            resource_id=str(setting.id),
            details={"key": setting.key, "value": setting.value}
        )
    
    def perform_update(self, serializer):
        setting = serializer.save(tenant=self.request.user.tenant)
        
        AuditLog.objects.create(
            user=self.request.user,
            tenant=self.request.user.tenant,
            action="UPDATE",
            resource="TenantSetting",
            resource_id=str(setting.id),
            details={"key": setting.key, "new_value": setting.value}
        )
    
    def destroy(self, request, *args, **kwargs):
        return Response(
            {"detail": "Deletion of tenant settings is not allowed. Please update values instead."},
            status=status.HTTP_403_FORBIDDEN
        )