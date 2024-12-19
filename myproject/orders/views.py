from django.shortcuts import render, redirect
from .models import Order

# Hiển thị danh sách các đơn hàng
def order_list(request):
    orders = Order.objects.all()  # Lấy tất cả các đơn hàng từ cơ sở dữ liệu
    return render(request, 'orders/order_list.html', {'orders': orders})

# Thêm đơn hàng mới
def add_order(request):
    if request.method == 'POST':  # Nếu người dùng gửi form
        customer_name = request.POST['customer_name']
        customer_phone = request.POST['customer_phone']
        product_name = request.POST['product_name']
        quantity = request.POST['quantity']
        price = request.POST['price']
        status = request.POST['status']
        
        # Thêm đơn hàng mới vào cơ sở dữ liệu
        Order.objects.create(
            customer_name=customer_name,
            customer_phone=customer_phone,
            product_name=product_name,
            quantity=int(quantity),
            price=float(price),
            status=status
        )
        return redirect('/orders/')  # Quay về trang danh sách đơn hàng
    
    return render(request, 'orders/add_order.html')
