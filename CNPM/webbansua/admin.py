from django.contrib.admin import AdminSite
from django.shortcuts import redirect
from django.contrib import admin
from .models import CustomUser
class CustomAdminSite(AdminSite):
    def login(self, request, extra_context=None):
        return redirect('/accounts/login/?next=/custom-admin/')

custom_admin_site = CustomAdminSite(name='custom_admin')
admin.site.register(CustomUser)
