from django.urls import path
from . import views

urlpatterns = [
    path('', views.order_list, name='order_list'),  # Trang hiển thị danh sách đơn hàng
    path('add/', views.add_order, name='add_order'),  # Trang thêm đơn hàng
]
