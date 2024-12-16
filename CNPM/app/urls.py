from django.contrib import admin
from django.urls import path
from .import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("", views.home,name='home'),
    path('login/', views.login_view, name='login'),
    path('exchangegifts/', views.exchange_gifts, name='doiqua'),
    path('promote/', views.promote, name='khuyenmai'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
