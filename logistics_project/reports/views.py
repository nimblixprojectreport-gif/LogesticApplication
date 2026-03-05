from django.shortcuts import render
from vehicles.models import vehicle
# Create your views here.
def dashboard(request):
    total_vehicles=vehicle.objects.count()
    return render(request,'dashboard.html',{'total_vehicles':total_vehicles})
