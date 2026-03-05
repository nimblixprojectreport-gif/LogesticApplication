from django.shortcuts import render,redirect
from .models import Webhook

# Create your views here.
def webhook_page(request):
    if request.method == "POST":
        url = request.POST.get('url')
        event = request.POST.get('event')
        Webhook.objects.create(url=url, event=event)
        return redirect('webhook_page')

    webhooks = Webhook.objects.all()
    return render(request, 'webhook.html', {'webhooks': webhooks})

def webhook_delete(request,id):
    webhook=Webhook.objects.get(id=id)
    webhook.delete()
    return redirect('webhook_page')

