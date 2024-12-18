from django.urls import path
from .views import add_order_view, view_orders_view, delete_order_view, update_order_view, confirm_order_view

urlpatterns = [
    path('add/', add_order_view, name='add_order'),
    path('view/', view_orders_view, name='view_orders'),
    path('delete/<int:order_id>/', delete_order_view, name='delete_order'),
    path('update/<int:order_id>/', update_order_view, name='update_order'),
    path('confirm/<int:order_id>/', confirm_order_view, name='confirm_order'),
]
