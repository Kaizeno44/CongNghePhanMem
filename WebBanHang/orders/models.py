from django.db import models

# Create your models here.
class Order(models.Model):
    customer_name = models.CharField(max_length=100)  # Tên khách hàng
    product_name = models.CharField(max_length=100)   # Tên sản phẩm
    quantity = models.IntegerField()                  # Số lượng sản phẩm
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Giá tiền
    status = models.CharField(
        max_length=50, 
        choices=[
            ('Pending', 'Chờ xác nhận'),
            ('Confirmed', 'Đã xác nhận'),
            ('Shipped', 'Đang vận chuyển'),
            ('Delivered', 'Đã giao'),
            ('Cancelled', 'Đã hủy')
        ],
        default='Pending'
    )  # Trạng thái đơn hàng
    order_date = models.DateTimeField(auto_now_add=True)  # Ngày đặt hàng

    def __str__(self):
        return f"Order {self.id} - {self.customer_name} - {self.product_name}"
