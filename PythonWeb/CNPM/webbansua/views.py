from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def home(request):
    context = {}
    return render(request, 'app/Home.html', context)
def login(request):
    context = {}
    return render(request, 'app/login.html', context)
def Redeem_gifts(request):
    context = {}
    return render(request, 'app/Doiqua.html', context)
def promote(request):
    context = {}
    return render(request, 'app/Khuyenmai.html', context)
def shopping_cart(request):
    context = {}
    return render(request, 'app/giohang.html', context)
def purchase(request):
    context = {}
    return render(request, 'app/muahang.html', context)
def check_order(request):
    context = {}
    return render(request, 'app/kiemtradonhang.html', context)
def knowledge(request):
    context = {}
    return render(request, 'app/kienthuc.html', context)
def Orderdetails(request):
    context = {}
    return render(request, 'app/chitietsp.html', context)
def Earnpoints(request):
    context = {}
    return render(request, 'app/tichdiem.html', context)