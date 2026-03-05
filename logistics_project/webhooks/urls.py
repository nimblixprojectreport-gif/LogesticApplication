from django.urls import path
from . import views

urlpatterns=[
    path('',views.webhook_page,name='webhook_page'),
    path('delete/<int:id>/',views.webhook_delete,name='webhook_delete'),
]