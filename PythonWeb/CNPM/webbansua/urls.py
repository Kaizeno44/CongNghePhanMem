from django.urls import path
from . import views
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from .views import logout_view
from django.conf import settings
from django.conf.urls.static import static

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
    path('Orderdetails/<int:id>/', views.Orderdetails, name='chitietsp'),
    path('Earnpoints/', views.Earnpoints, name='tichdiem'),
    path('Profile/', views.Profile, name='hoso'),
    path('logout/', logout_view, name='logout'),
    path('api/products/', views.get_products, name='get_products'),
    path('api/cartitem/add/', views.add_to_cart, name='add_to_cart'),  
    path('api/cartitem/', views.get_cart_items, name='get_cart_items'),
    path('api/customuser/', views.get_customuser, name='get_customuser'),
    path('api/currentuser/', views.get_current_user, name='get_current_user'),
    path('api/user-cart/', views.get_user_cart_items, name='get_user_cart'),
    path("api/check_login/", views.check_login_status, name="check_login"),
    path("api/promotion/", views.get_promotion, name="get_promotion"),
    path('api/cartitem/update/', views.update_cart_item, name='update_cart_item'),
    path('api/order/add/', views.create_order, name='create_order'),
    path('api/cartitem/delete/', views.delete_cart_item, name='delete_cart_item'),
    path('api/product/<int:id>/', views.get_product_by_id, name='get_product_by_id'),
    path("api/product/<int:id>/related/", views.get_related_products, name="get_related_products"),
    path("api/search/", views.search_products, name="search_products"),
    path("api/Earnpoints/", views.tichdiem_view, name="tich_diem"),
    path('api/rewards/', views.get_rewards, name='get_rewards'),
    path('api/redeem_gift/', views.redeem_gift, name='redeem_gift'),
    path("api/check_order/", views.check_order_by_phone, name="check_order_by_phone"),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
