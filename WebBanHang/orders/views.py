
# Create your views here.
from django.shortcuts import render, redirect
from .models import Order

def add_order_view(request):
    if request.method == 'POST':
        customer_name = request.POST.get('customer_name')
        product_name = request.POST.get('product_name')
        quantity = int(request.POST.get('quantity'))
        price = float(request.POST.get('price'))

        Order.objects.create(
            customer_name=customer_name,
            product_name=product_name,
            quantity=quantity,
            price=price
        )
        return redirect('view_orders')

    return render(request, 'orders/add_order.html')

def view_orders_view(request):
    orders = Order.objects.all()
    return render(request, 'orders/view_orders.html', {'orders': orders})

def delete_order_view(request, order_id):
    order = Order.objects.get(id=order_id)
    order.delete()
    return redirect('view_orders')

def update_order_view(request, order_id):
    order = Order.objects.get(id=order_id)
    if request.method == 'POST':
        order.customer_name = request.POST.get('customer_name')
        order.product_name = request.POST.get('product_name')
        order.quantity = int(request.POST.get('quantity'))
        order.price = float(request.POST.get('price'))
        order.save()
        return redirect('view_orders')

    return render(request, 'orders/update_order.html', {'order': order})

def confirm_order_view(request, order_id):
    order = Order.objects.get(id=order_id)
    order.status = 'Confirmed'
    order.save()
    return redirect('view_orders')
