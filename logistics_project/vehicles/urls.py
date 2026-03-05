from django.urls import path
from . import views

urlpatterns = [
    path('', views.vehicle_list, name='vehicle_list'),
    path('add/', views.vehicle_add, name='vehicle_create'),
    path('update/<int:id>/', views.vehicle_update, name='vehicle_update'),
    path('delete/<int:id>/', views.vehicle_delete, name='vehicle_delete'),
]