from django.urls import path
from . import views
from .admin import admin
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from .views import logout_view

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_register, name='login'),
    path('register/', views.login_register, name='register'),
    path('exchangegifts/', views.Redeem_gifts, name='doiqua'),
    path('promote/', views.promote, name='khuyenmai'),
    path('shoppingcart/', views.shopping_cart, name='giohang'),
    path('purchase/', views.purchase, name='muahang'),
    path('checkorder/', views.check_order, name='kiemtradonhang'),
    path('knowledge/', views.knowledge, name='kienthuc'),
    path('admin/', admin.site.urls), 
    path('Orderdetails/', views.Orderdetails, name='chitietsp'),
    path('Earnpoints/', views.Earnpoints, name='tichdiem'),
    path('Profile/', views.Profile, name='hoso'),
    path('logout/', logout_view, name='logout'),
]
