from django.urls import path
from . import views
from .admin import custom_admin_site
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views

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
    path('admin/', custom_admin_site.urls),  # Trang admin tùy chỉnh
    path('custom-admin/', login_required(views.custom_admin_view), name='custom-admin'),
]
