from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        # Kiểm tra email
        if not email:
            raise ValueError('The Email field must be set')
        
        # Chuẩn hóa email
        email = self.normalize_email(email)
        
        # Tạo người dùng mới
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)  # Đặt mật khẩu
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        # Đảm bảo rằng superuser có quyền admin
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(username, email, password, **extra_fields)


# CustomUser kế thừa từ AbstractUser, cho phép thêm các trường tùy chỉnh
class CustomUser(AbstractUser):
    # Thêm trường tùy chỉnh như phone nếu cần
    phone_number = models.CharField(max_length=15, null=True, blank=True)  # Thêm trường số điện thoại
    # Chỉ định manager cho CustomUser
    objects = CustomUserManager()
    class Meta:
        db_table = 'webbansua_customuser'
    def __str__(self):
        return self.username  # Trả về tên người dùng khi in đối tượng


@receiver(post_save, sender=CustomUser)
def create_employee_for_new_user(sender, instance, created, **kwargs):
    if created:
        # Kiểm tra xem Employee đã tồn tại chưa trước khi tạo mới
        if not hasattr(instance, 'employee'):
            Employee.objects.create(
                user=instance,
                name=instance.username,
                email=instance.email,
                position='Employee'
            )


@receiver(post_save, sender=CustomUser)
def save_employee(sender, instance, **kwargs):
    try:
        # Cập nhật thông tin nhân viên khi CustomUser thay đổi
        instance.employee.save()
    except Employee.DoesNotExist:
        pass
class Employee(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    position = models.CharField(max_length=100)
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    customer = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=50,
        choices=[
            ('Pending', 'Pending'),
            ('Shipped', 'Shipped'),
            ('Delivered', 'Delivered'),
            ('Cancelled', 'Cancelled'),
        ],
        default='Pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    voucher = models.ForeignKey('Voucher', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Order {self.id} - {self.phone_number or self.customer.username}"

class Voucher(models.Model):
    code = models.CharField(max_length=50, unique=True)  # Mã giảm giá
    discount_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Giá trị giảm giá (tiền mặt)
    discount_percent = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # % giảm giá
    minimum_order_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Điều kiện áp dụng
    brand = models.CharField(max_length=100, null=True, blank=True)  # Nhãn hiệu áp dụng
    expiration_date = models.DateField()  # Ngày hết hạn
    description = models.TextField(null=True, blank=True)  # Mô tả thêm

    def __str__(self):
        return f"{self.code} - {self.brand or 'Generic'}"

    @property
    def is_active(self):
        from django.utils.timezone import now
        return now().date() <= self.expiration_date


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



class Product(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('out_of_stock', 'Out of Stock'),
        ('discontinued', 'Discontinued'),
    ]

    CATEGORY_CHOICES = [
        ('sua_bot_dinh_duong', 'Sữa bột dinh dưỡng'),
        ('ta_bim_cho_be', 'Tả bỉm cho bé'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Giá sau khi giảm giá
    stock = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')  # Trạng thái sản phẩm
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, null=True, blank=True)  # Phân loại sản phẩm
    image = models.ImageField(upload_to='products/', blank=True, null=True)  # Trường để upload ảnh
    image_url = models.URLField(blank=True, null=True)  # Trường để lưu link ảnh trực tuyến
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Cart(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)  # Người dùng sở hữu giỏ hàng
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"
    
class CartItem(models.Model):
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE)  # Liên kết với giỏ hàng
    product = models.ForeignKey('Product', on_delete=models.CASCADE)  # Liên kết với sản phẩm
    quantity = models.PositiveIntegerField(default=1)  # Số lượng sản phẩm
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in {self.cart}"

class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)  # Liên kết với đơn hàng
    product = models.ForeignKey('Product', on_delete=models.CASCADE)  # Liên kết với sản phẩm
    quantity = models.PositiveIntegerField()  # Số lượng sản phẩm
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Giá tại thời điểm đặt hàng

class Promotion(models.Model):
    title = models.CharField(max_length=255)  # Tiêu đề khuyến mãi
    description = models.TextField(blank=True, null=True)  # Mô tả
    discount_percent = models.DecimalField(max_digits=5, decimal_places=2)  # % giảm giá
    start_date = models.DateField()  # Ngày bắt đầu
    end_date = models.DateField()  # Ngày kết thúc
    image = models.ImageField(upload_to='promotions/', blank=True, null=True)  # Ảnh khuyến mãi

    def __str__(self):
        return self.title

    @property
    def is_active(self):
        from django.utils.timezone import now
        return self.start_date <= now().date() <= self.end_date