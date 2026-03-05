from django.shortcuts import render, redirect
from .models import vehicle

def vehicle_list(request):
    vehicles = vehicle.objects.all()
    return render(request, 'vehicle_list.html', {'vehicles': vehicles})

def vehicle_add(request):
    if request.method == "POST":
        name = request.POST.get('name')
        number = request.POST.get('number')
        type = request.POST.get('type')
        vehicle.objects.create(name=name, number=number, type=type)
        return redirect('vehicle_list')

    return render(request, 'vehicle_add.html')

def vehicle_update(request, id):
    v = vehicle.objects.get(id=id)

    if request.method == "POST":
        v.name = request.POST.get('name')
        v.number = request.POST.get('number')
        v.type = request.POST.get('type')
        v.save()
        return redirect('vehicle_list')

    return render(request, 'vehicle/vehicle_add.html', {'vehicle': v})

def vehicle_delete(request, id):
    v = vehicle.objects.get(id=id)
    v.delete()
    return redirect('vehicle_list')