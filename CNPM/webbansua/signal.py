from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order, Point

@receiver(post_save, sender=Order)
def update_points_on_order_delivery(sender, instance, created, **kwargs):
    # Kiểm tra nếu đơn hàng có trạng thái "Đã giao"
    if instance.status == 'Delivered' and not created:
        if instance.customer:
            # Giả sử 1 triệu đồng = 10 điểm
            points_earned = instance.total_price // 100000
            instance.customer.points += points_earned
            instance.customer.save()

            # Lưu lịch sử tích điểm
            Point.objects.create(user=instance.customer, order=instance, points_earned=points_earned)