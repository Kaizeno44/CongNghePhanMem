from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def home(request):
    return render(request,'app/home.html')
def login_view(request):
    return render(request, 'app/login.html')
def exchange_gifts(request):
    return render(request, 'app/doiqua.html')
def promote(request):
    return render(request, 'app/khuyenmai.html')