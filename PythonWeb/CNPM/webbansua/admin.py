from django.contrib import admin
from .models import (
    CustomUser,
    Employee,
    Order,
    Voucher,
    Product,
    Promotion,
    CartItem,
    OrderItem,
    Brand
)

# Đăng ký các model
admin.site.register(Employee)
admin.site.register(Order)
admin.site.register(Voucher)
admin.site.register(Product)
admin.site.register(CartItem)


# Custom admin cho CustomUser
class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['username', 'phone_number', 'first_name', 'last_name']
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'phone_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'phone_number', 'password1', 'password2', 'is_staff', 'is_active')},
        ),
    )
    search_fields = ('phone_number', 'username')
    ordering = ('phone_number',)

admin.site.register(CustomUser, CustomUserAdmin)

# Custom admin cho Promotion
@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'is_active')
    search_fields = ('title', 'description')
    list_filter = ('start_date', 'end_date')

# Custom admin cho OrderItem
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
    search_fields = ('order__id', 'product__name')  # Tìm kiếm theo đơn hàng hoặc sản phẩm
    list_filter = ('order',)
@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_url')  # Hiển thị tên và URL hình ảnh
    search_fields = ('name',)  # Tìm kiếm theo tên