from django.shortcuts import redirect
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .models import Employee, Order, Voucher, Article, Product,Promotion,CartItem

admin.site.register(Employee)
admin.site.register(Order)
admin.site.register(Voucher)
admin.site.register(Article)
admin.site.register(Product)
admin.site.register(CartItem)
class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['username', 'phone_number', 'first_name', 'last_name']
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'phone_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login',)}),  # Thêm dấu phẩy để biến thành tuple
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'phone_number', 'password1', 'password2', 'is_staff', 'is_active')},
        ),
    )
    search_fields = ('phone_number', 'username')
    ordering = ('phone_number',)

# Sử dụng admin tùy chỉnh để đăng ký CustomUser
admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'is_active')
    search_fields = ('title', 'description')
    list_filter = ('start_date', 'end_date')