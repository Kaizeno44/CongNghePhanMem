from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('exchangegifts/', views.Redeem_gifts, name='doiqua'),
    path('promote/', views.promote, name='khuyenmai'),
    path('shoppingcart/', views.shopping_cart, name='giohang'),
    path('purchase/', views.purchase, name='muahang'),
    path('checkorder/', views.check_order, name='kiemtradonhang'),
    path('knowledge/', views.knowledge, name='kienthuc'),
    path('Orderdetails/', views.Orderdetails, name='chitietsp'),
    path('Earnpoints/', views.Earnpoints, name='tichdiem'),
    path('Profile/', views.Profile, name='hoso')

]