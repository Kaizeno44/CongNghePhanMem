from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUserManager(BaseUserManager):
    def create_user(self, username, sdt, password=None, **extra_fields):
        if not sdt:
            raise ValueError('The Phone Number field must be set')
        
        sdt = sdt.strip()  
        user = self.model(username=username, phone_number=sdt, **extra_fields)
        user.set_password(password)  # Mã hóa mật khẩu
        user.save(using=self._db)
        return user

    def create_superuser(self, username, sdt, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, sdt, password, **extra_fields)

# CustomUser kế thừa từ AbstractUser, cho phép thêm các trường tùy chỉnh
class CustomUser(AbstractUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    phone_number = models.CharField(max_length=10, unique=True, blank=True, null=True)  # Không bắt buộc cho đăng nhập
    is_active = models.BooleanField(default=True)   
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'  # Đăng nhập bằng tên đăng nhập
    REQUIRED_FIELDS = []  # Không yêu cầu các trường bổ sung khi tạo superuser

    def __str__(self):
        return self.username
class Employee(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)  # Tên nhân viên
    phone = models.CharField(max_length=15, null=True, blank=True)  # Số điện thoại
    position = models.CharField(max_length=100)  # Vị trí
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
@receiver(post_save, sender=CustomUser)
def create_employee_for_new_user(sender, instance, created, **kwargs):
    if created:
        if not hasattr(instance, 'employee'):
            Employee.objects.create(
                user=instance,
                name=instance.username,  # Sử dụng `username` từ `CustomUser`
                phone=instance.phone_number,  # Sử dụng `phone_number` từ `CustomUser`
                position='Employee'
            )


@receiver(post_save, sender=CustomUser)
def save_employee(sender, instance, **kwargs):
    try:
        # Cập nhật thông tin nhân viên khi CustomUser thay đổi
        instance.employee.save()
    except Employee.DoesNotExist:
        pass



class Order(models.Model):
    customer = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=50,
        choices=[
            ('dang_cho_xu_ly', 'Đang chờ xử lý'),
            ('da_van_chuyen', 'Đã vận chuyển'),
            ('da_giao', 'Đã giao'),
            ('da_huy', 'Đã hủy'),
        ],
        default='dang_cho_xu_ly'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    voucher = models.ForeignKey('Voucher', on_delete=models.SET_NULL, null=True, blank=True)
    
    # Các trường mới thêm vào
    full_name = models.CharField(max_length=255, null=False, default='')  # Họ và tên
    notes = models.TextField(null=True, blank=True)  # Ghi chú thêm
    address = models.TextField(null=True, blank=True)  # Địa chỉ

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
        ('con_hang', 'Còn hàng'),
        ('het_hang', 'Hết hàng'),
    ]

    CATEGORY_CHOICES = [
        ('sua_bot_dinh_duong', 'Sữa bột dinh dưỡng'),
        ('ta_bim_cho_be', 'Tả bỉm cho bé'),
        ('hang_ban_chay', 'Hàng bán chạy'),
        ('hang_khuyen_mai', 'Hàng khuyến mãi'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Giá sau khi giảm giá
    quantity = models.PositiveIntegerField()  # Thay đổi từ stock sang quantity
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')  # Trạng thái sản phẩm
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, null=True, blank=True)  # Phân loại sản phẩm
    image_url = models.URLField(blank=True, null=True)  # Trường để lưu link ảnh trực tuyến
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    @property
    def discount(self):
        if self.price and self.sale_price:
            return round(100 * (self.price - self.sale_price) / self.price, 0)
        return 0
    

class CartItem(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image_url = models.URLField(null=True, blank=True)  # Thêm trường image_url

    def __str__(self):
        return f"{self.quantity} of {self.product.name if self.product else 'Unknown'} for {self.user.username if self.user else 'Unknown User'}"


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)  # Liên kết với đơn hàng
    product = models.ForeignKey('Product', on_delete=models.CASCADE)  # Liên kết với sản phẩm
    quantity = models.PositiveIntegerField()  # Số lượng sản phẩm
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Giá tại thời điểm đặt hàng

class Promotion(models.Model):
    title = models.CharField(max_length=255)  # Tiêu đề khuyến mãi
    description = models.TextField(blank=True, null=True)  # Mô tả
    start_date = models.DateField()  # Ngày bắt đầu
    end_date = models.DateField()  # Ngày kết thúc
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title

    @property
    def is_active(self):
        from django.utils.timezone import now
        return self.start_date <= now().date() <= self.end_date
    
class Reward(models.Model):
    img_url = models.URLField(blank=True, null=True)  # Link ảnh của quà
    product_name = models.CharField(max_length=255)  # Tên sản phẩm quà tặng
    points = models.PositiveIntegerField()  # Số điểm cần để đổi quà

    def __str__(self):
        return f"{self.product_name} - {self.points} points"
    

class Point(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)  # Liên kết người dùng
    order = models.ForeignKey('Order', on_delete=models.CASCADE)  # Liên kết với đơn hàng
    points_earned = models.PositiveIntegerField()  # Số điểm tích được từ đơn hàng
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User {self.user.username} earned {self.points_earned} points from Order {self.order.id}"