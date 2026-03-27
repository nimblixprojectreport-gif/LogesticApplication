from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Shipment
from .services import ShipmentService
from rest_framework.serializers import ModelSerializer
from django.shortcuts import render

def dashboard(request):
    return render(request, "shipment/dashboard.html")


class ShipmentSerializer(ModelSerializer):
    class Meta:
        model = Shipment
        fields = "__all__"


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
    filter_backends = [SearchFilter]
    search_fields = ['tracking_number', 'customer_name', 'customer_phone']

    # ✅ Bulk Create
    @action(detail=False, methods=['post'])
    def bulk_create(self, request):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Bulk shipments created"})

    # ✅ Assign Driver
    @action(detail=True, methods=['post'])
    def assign_driver(self, request, pk=None):
        shipment = self.get_object()
        ShipmentService.assign_driver(shipment, request.user)
        return Response({"message": "Driver assigned"})

    # ✅ Update Status
    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        shipment = self.get_object()
        new_status = request.data.get("status")
        ShipmentService.update_status(shipment, new_status)
        return Response({"message": "Status updated"})

    # ✅ Cancel
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        shipment = self.get_object()
        ShipmentService.cancel_shipment(shipment)
        return Response({"message": "Shipment cancelled"})

    # ✅ Mark RTO
    @action(detail=True, methods=['post'])
    def mark_rto(self, request, pk=None):
        shipment = self.get_object()
        ShipmentService.mark_rto(shipment)
        return Response({"message": "Marked as RTO"})

    # ✅ Bulk Update Status
    @action(detail=False, methods=['post'])
    def bulk_update_status(self, request):
        ids = request.data.get("ids")
        new_status = request.data.get("status")

        shipments = Shipment.objects.filter(id__in=ids)

        for shipment in shipments:
            ShipmentService.update_status(shipment, new_status)

        return Response({"message": "Bulk status updated"})