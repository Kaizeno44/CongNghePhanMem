from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import LoginForm, RegistrationForm
from .models import CustomUser, Product, Promotion, CartItem,Voucher
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.timezone import now


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
    # Truy vấn các voucher còn hiệu lực
    vouchers = Voucher.objects.filter(expiration_date__gte=now().date()).values(
        'code',
        'discount_value',
        'discount_percent',
        'minimum_order_value',
        'brand',
        'expiration_date',
        'description'
    )

    # Serialize dữ liệu sang JSON
    context = {
        'vouchers_json': json.dumps(list(vouchers), cls=DjangoJSONEncoder),
    }
    return render(request, 'app/muahang.html', context)

def check_order(request):
    context = {}
    return render(request, 'app/kiemtradonhang.html', context)
def knowledge(request):
    context = {}
    return render(request, 'app/kienthuc.html', context)
def Orderdetails(request, id):
    product = get_object_or_404(Product, id=id)  
    context = {'product': product}
    return render(request, 'app/chitietsp.html', context)
def Earnpoints(request):
    context = {}
    return render(request, 'app/tichdiem.html', context)
def Profile(request):
    context = {}
    return render(request, 'app/hoso.html', context)

# Trang chủ
def home(request):
    username = request.session.get('username') 
    products = Product.objects.exclude(id=None)
    context = {'products': products,'username': username}
    return render(request, 'app/Home.html', context)

# Xử lý đăng nhập và đăng ký
def login_register(request):
    login_form = LoginForm()
    register_form = RegistrationForm()

    if request.method == 'POST':
        if 'login' in request.POST:
            username = request.POST.get('username')
            password = request.POST.get('password')
            if not username or not password:
                messages.error(request, 'Tên đăng nhập và mật khẩu không được để trống.', extra_tags='')
                return redirect('login')
            user = authenticate(request, username=username, password=password)
            if user:
                if not user.is_active:
                    messages.error(request, 'Tài khoản của bạn đã bị khóa.', extra_tags='')
                    return redirect('login')
                login(request, user)
                request.session['username'] = user.username  
                request.session['phone_number'] = user.phone_number  
                messages.success(request, f'Xin chào, {user.username}! Bạn đã đăng nhập thành công.', extra_tags='')
                return redirect('home')
            else:
                messages.error(request, 'Tên đăng nhập hoặc mật khẩu không đúng.', extra_tags='')
                return redirect('login')
        if 'register' in request.POST:
            register_form = RegistrationForm(request.POST)
            if register_form.is_valid():
                username = register_form.cleaned_data['username']
                phone_number = register_form.cleaned_data['phone_number']
                if CustomUser.objects.filter(username=username).exists():
                    messages.error(request, 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.', extra_tags='regster_error')
                    return redirect('login')

                if CustomUser.objects.filter(phone_number=phone_number).exists():
                    messages.error(request, 'Số điện thoại đã tồn tại. Vui lòng sử dụng số khác.', extra_tags='register_error')
                    return redirect('login')
                user = register_form.save(commit=False)
                user.set_password(register_form.cleaned_data['password'])
                user.save()
                messages.success(request, f'Đăng ký thành công! Chào mừng, {user.username}.', extra_tags='register_success')
                return redirect('login')
            else:
                messages.error(request, 'Đăng ký không thành công. Vui lòng kiểm tra thông tin.', extra_tags='register_error')
                return redirect('login')

    return render(request, 'app/login.html', {
        'login_form': login_form,
        'register_form': register_form,
    })
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        request.session.flush()  
        messages.success(request, 'Bạn đã đăng xuất thành công.')
    return redirect('home')
def get_products(request):
    products = Product.objects.all().values(
        'id', 'name', 'price', 'quantity', 'sale_price', 'image_url', 'category', 'status'
    )
    return JsonResponse(list(products), safe=False)
def add_to_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            product_name = data.get("product")  
            quantity = data.get("quantity", 1)  
            if not product_name:
                return JsonResponse({"error": "Thiếu tên sản phẩm"}, status=400)
            product = Product.objects.filter(name=product_name).first()
            if not product:
                return JsonResponse({"error": "Không tìm thấy sản phẩm"}, status=404)
            cart_item = CartItem.objects.filter(user=request.user, product=product).first()
            if cart_item:
                cart_item.quantity += quantity
                cart_item.save()
            else:
                cart_item = CartItem.objects.create(
                    user=request.user,
                    product=product,
                    quantity=quantity,
                    image_url=product.image_url,
                    price=product.price,
                )
            return JsonResponse({"message": "Cập nhật giỏ hàng thành công"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
def get_cart_items(request):
    cart_items = CartItem.objects.all()
    cart_item_list = list(cart_items.values(
        'id', 'price', 'image_url', 'quantity', 'user_id','product_id'
    ))
    return JsonResponse(cart_item_list, safe=False, status=200)
def get_customuser(request):
    customuser = CustomUser.objects.all().values(
        'id', 'username', 'email', 'password', 'phone_number', 'points', 'is_active', 'date_joined'
    )
    return JsonResponse(list(customuser), safe=False)
def get_current_user(request):
    user = request.user  
    data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'phone_number': user.phone_number,
    }
    return JsonResponse(data)
@login_required
def get_user_cart_items(request):
    try:
        # Lấy giỏ hàng của người dùng hiện tại
        cart_items = CartItem.objects.filter(user=request.user).select_related('product')
        cart_item_list = [
            {
                "id": item.id,
                "product_name": item.product.name,
                "price": item.price,
                "quantity": item.quantity,
                "image_url": item.image_url,
                "total": item.price * item.quantity,
            }
            for item in cart_items
        ]
        return JsonResponse(cart_item_list, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
def check_login_status(request):
    if request.user.is_authenticated:
        return JsonResponse({"logged_in": True})
    return JsonResponse({"logged_in": False})
def get_promotion(request):
    promotion = Promotion.objects.all().values(
        'id', 'title', 'description', 'image' )
    return JsonResponse(list(promotion), safe=False)