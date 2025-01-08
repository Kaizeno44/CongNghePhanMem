from django.http import HttpResponse
from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from .models import CustomUser,Product,Promotion
from .forms import LoginForm, RegistrationForm
from webbansua.models import CustomUser

# Create your views here.
def home(request):
    products = Product.objects.exclude(id=None)
    promotions = Promotion.objects.all()   
    active_promotions = [promotion for promotion in promotions if promotion.is_active]

    context = {'products': products, 'promotions': active_promotions}
    return render(request, 'app/Home.html', context)

def user_login(request):
    login_form = LoginForm()
    return render(request, 'app/login.html', {'login_form': login_form})
def Redeem_gifts(request):
    context = {}
    return render(request, 'app/Doiqua.html', context)
def promote(request):
    promotions = Promotion.objects.all()
    
    # Lọc các khuyến mãi đang hoạt động (is_active) trong Python
    active_promotions = [promotion for promotion in promotions if promotion.is_active]
    return render(request, 'app/Khuyenmai.html', {'promotions': active_promotions})
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
def Orderdetails(request, id):
    product = get_object_or_404(Product, id=id)  # Sử dụng get_object_or_404
    context = {'product': product}
    return render(request, 'app/chitietsp.html', context)
def Earnpoints(request):
    context = {}
    return render(request, 'app/tichdiem.html', context)
def Profile(request):
    context = {}
    return render(request, 'app/hoso.html', context)

# from django.shortcuts import render
# from .models import Promotion
# from django.utils.timezone import now

# def promotions_page(request):
#     # Lấy các chương trình khuyến mãi đang hoạt động
#     active_promotions = Promotion.objects.filter(
#         start_date__lte=now().date(),
#         end_date__gte=now().date()
#     )
#     return render(request, 'promotions.html', {'promotions': active_promotions})
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
                    return redirect('home')  # Đảm bảo 'home' đã định nghĩa trong urls.py
                else:
                    messages.error(request, 'Tên đăng nhập hoặc mật khẩu không đúng.')
            else:
                messages.error(request, "Thông tin đăng nhập không hợp lệ.")

        # Xử lý đăng ký
        elif 'register' in request.POST:
            register_form = RegistrationForm(request.POST)
            if register_form.is_valid():
                username = register_form.cleaned_data['username']
                email = register_form.cleaned_data['email']
                if CustomUser.objects.filter(username=username).exists():
                    messages.error(request, 'Tên người dùng đã tồn tại.')
                elif CustomUser.objects.filter(email=email).exists():
                    messages.error(request, 'Email đã được đăng ký.')
                else:
                    try:
                        user = register_form.save()
                        messages.success(request, "Đăng ký thành công! Bạn có thể đăng nhập ngay.")
                        return redirect('login')  # Đảm bảo 'login' đã định nghĩa trong urls.py
                    except Exception as e:
                        print(f"Lỗi khi lưu người dùng: {e}")
                        messages.error(request, "Đăng ký thất bại. Vui lòng thử lại.")
            else:
                print(register_form.errors)
                messages.error(request, "Đăng ký không thành công, vui lòng kiểm tra lại thông tin.")

    return render(request, 'app/login.html', {
        'login_form': login_form,
        'register_form': register_form
    })


def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('login')