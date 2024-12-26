from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from .models import CustomUser 
from .forms import LoginForm, RegistrationForm
from webbansua.models import CustomUser
# Create your views here.
def home(request):
    context = {}
    return render(request, 'app/Home.html', context)
def user_login(request):
    login_form = LoginForm()
    return render(request, 'app/login.html', {'login_form': login_form})
def Redeem_gifts(request):
    context = {}
    return render(request, 'app/Doiqua.html', context)
def promote(request):
    context = {}
    return render(request, 'app/Khuyenmai.html', context)
def shopping_cart(request):
    context = {}
    return render(request, 'app/giohang.html', context)
def purchase(request):
    context = {}
    return render(request, 'app/muahang.html', context)
def check_order(request):
    context = {}
    return render(request, 'app/kiemtradonhang.html', context)
def knowledge(request):
    context = {}
    return render(request, 'app/kienthuc.html', context)
def custom_admin_view(request):
    return render(request, 'app/custom_admin.html')
def login_register(request):
    login_form = LoginForm()
    register_form = RegistrationForm()

    if request.method == 'POST':
        # Xử lý đăng nhập
        if 'login' in request.POST:
            login_form = LoginForm(request.POST)
            if login_form.is_valid():
                username = login_form.cleaned_data['username']
                password = login_form.cleaned_data['password']
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    return redirect('home')
                else:
                    messages.error(request, 'Tên đăng nhập hoặc mật khẩu không đúng.')

        # Xử lý đăng ký
        elif 'register' in request.POST:
            register_form = RegistrationForm(request.POST)
            if register_form.is_valid():
                # Kiểm tra nếu tên người dùng hoặc email đã tồn tại
                username = register_form.cleaned_data['username']
                email = register_form.cleaned_data['email']
                if CustomUser.objects.filter(username=username).exists():
                    messages.error(request, 'Tên người dùng đã tồn tại.')
                elif CustomUser.objects.filter(email=email).exists():
                    messages.error(request, 'Email đã được đăng ký.')
                else:
                    # Tạo người dùng mới
                    user = register_form.save()
                    messages.success(request, "Đăng ký thành công! Bạn có thể đăng nhập ngay.")
                    return redirect('login')
            else:
                print(register_form.errors)  # In ra lỗi nếu form không hợp lệ
                messages.error(request, "Đăng ký không thành công, vui lòng kiểm tra lại thông tin.")

    return render(request, 'app/login.html', {
        'login_form': login_form,
        'register_form': register_form
    })