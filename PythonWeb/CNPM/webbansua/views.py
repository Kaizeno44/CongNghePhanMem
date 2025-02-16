from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import LoginForm, RegistrationForm
from .models import CustomUser, Product, Promotion, CartItem, Voucher, Order,OrderItem, Reward,Brand
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from django.utils.timezone import now
from django.contrib.messages import get_messages
from django.shortcuts import get_object_or_404
from django.db.models import Q
from decimal import Decimal
import json
import random
import re
from django.core.serializers.json import DjangoJSONEncoder
from django.core.paginator import Paginator

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
    vouchers = Voucher.objects.filter(expiration_date__gte=now().date()).values(
        'code',
        'discount_value',
        'discount_percent',
        'minimum_order_value',
        'brand',
        'expiration_date',
        'description'
    )
    brands_raw = Brand.objects.values('id', 'name', 'image_url')
    seen = set()
    brands = []
    for brand in brands_raw:
        if brand['name'] not in seen:
            seen.add(brand['name'])
            brands.append(brand)    
    
    brand_id = request.GET.get('brand_id')  
    if brand_id:
        # Lọc sản phẩm theo brand_id
        products = Product.objects.filter(name_brand=Brand.objects.get(id=brand_id).name)
    else:
        # Hiển thị tất cả sản phẩm nếu không có lọc
        products = Product.objects.all()


    paginator = Paginator(products, 12)  
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # Serialize dữ liệu sang JSON
    context = {
        'vouchers_json': json.dumps(list(vouchers), cls=DjangoJSONEncoder),
        'brands': brands,
        'products': products,
        'page_obj': page_obj
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
    storage = get_messages(request)
    context = {'products': products,'username': username , 'messages': storage}
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
                    messages.error(request, 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.', extra_tags='')
                    return redirect('login')

                if CustomUser.objects.filter(phone_number=phone_number).exists():
                    messages.error(request, 'Số điện thoại đã tồn tại. Vui lòng sử dụng số khác.', extra_tags='')
                    return redirect('login')
                user = register_form.save(commit=False)
                user.set_password(register_form.cleaned_data['password'])
                user.save()
                messages.success(request, f'Đăng ký thành công! Chào mừng, {user.username}.', extra_tags='')
                return redirect('login')
            else:
                messages.error(request, 'Đăng ký không thành công. Vui lòng kiểm tra thông tin.', extra_tags='')
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
        'id', 'username', 'email', 'password', 'phone_number', 'points', 'is_active', 'date_joined', "Point"
    )
    return JsonResponse(list(customuser), safe=False)
def get_current_user(request):
    user = request.user  
    data = {
        'id': user.id,
        'username': user.username,
        'phone_number': user.phone_number,
        'points': user.Point  

    }
    return JsonResponse(data)
@login_required
def get_user_cart_items(request):
    try:
        cart_items = CartItem.objects.filter(user=request.user).select_related('product')

        cart_item_list = [
            {
                "id": item.id,
                "product_name": item.product.name if item.product else "Quà tặng",
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
@csrf_exempt
@login_required
def update_cart_item(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            cart_item_id = data.get("id")
            new_quantity = data.get("quantity")
            if not cart_item_id or new_quantity is None:
                return JsonResponse({"error": "Thiếu thông tin giỏ hàng hoặc số lượng"}, status=400)
            cart_item = CartItem.objects.filter(id=cart_item_id, user=request.user).first()
            if not cart_item:
                return JsonResponse({"error": "Không tìm thấy sản phẩm trong giỏ hàng"}, status=404)
            cart_item.quantity = new_quantity
            cart_item.save()
            return JsonResponse({"message": "Cập nhật số lượng thành công"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
@csrf_exempt
@login_required
@transaction.atomic
def create_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            full_name = data.get("full_name")
            address = data.get("address")
            phone_number = data.get("phone_number")
            notes = data.get("notes")
            payment_method = data.get("payment_method")  
            user = request.user

            if not full_name or not address or not phone_number or not payment_method:
                return JsonResponse({"error": "Vui lòng nhập đầy đủ thông tin!"}, status=400)

            cart_items = CartItem.objects.filter(user=user).exclude(product__isnull=True)
            if not cart_items.exists():
                return JsonResponse({"error": "Giỏ hàng trống hoặc chứa sản phẩm không hợp lệ."}, status=400)

            total_price = sum(item.price * item.quantity for item in cart_items)

            order = Order.objects.create(
                customer=user,
                total_price=total_price,
                phone_number=phone_number,
                address=address,
                full_name=full_name,
                notes=notes,
                status="dang_cho_xu_ly",
                payment_method=payment_method,  
            )

            for item in cart_items:
                OrderItem.objects.create(
                    order=order,  
                    product=item.product,  
                    quantity=item.quantity,
                    price=item.price,
                )

            cart_items.delete()
            return JsonResponse({"message": "Đặt hàng thành công!", "order_id": order.id}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
@login_required
def delete_cart_item(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            cart_item_id = data.get("id")
            if not cart_item_id:
                return JsonResponse({"error": "Thiếu thông tin giỏ hàng"}, status=400)
            cart_item = CartItem.objects.filter(id=cart_item_id, user=request.user).first()
            if not cart_item:
                return JsonResponse({"error": "Không tìm thấy sản phẩm trong giỏ hàng"}, status=404)
            cart_item.delete()
            return JsonResponse({"message": "Xóa sản phẩm thành công"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
def get_product_by_id(request, id):
    product = get_object_or_404(Product, id=id)
    product_data = {
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "status": product.status,
        "sale_price": product.sale_price,
        "description": product.description,
        "image_url": product.image_url,
    }
    return JsonResponse(product_data)
def get_related_products(request, id):
    product = get_object_or_404(Product, id=id)  
    related_products = list(Product.objects.filter(category=product.category).exclude(id=id))  
    random.shuffle(related_products)  
    selected_products = related_products[:5] 
    data = [
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "sale_price": p.sale_price,
            "image_url": p.image_url,
        }
        for p in selected_products
    ]
    return JsonResponse(data, safe=False)
def search_products(request):
    query = request.GET.get("q", "").strip()  
    if not query:
        return JsonResponse([], safe=False)  
    products = Product.objects.filter(Q(name__icontains=query))[:5]  
    data = list(products.values("id", "name", "image_url"))  
    return JsonResponse(data, safe=False)

def get_rewards(request):
    rewards = Reward.objects.all().values("id", "img_url", "product_name", "points")
    return JsonResponse(list(rewards), safe=False)
@csrf_exempt
@login_required
def tichdiem_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            phone = data.get('phone')
            if not phone or not phone.isdigit() or len(phone) != 10:
                return JsonResponse({'message': 'Số điện thoại không hợp lệ.'}, status=400)
            user = CustomUser.objects.filter(phone_number=phone).first()
            if not user:
                return JsonResponse({'message': 'Người dùng không tồn tại.'}, status=404)
            orders = Order.objects.filter(customer=user, status="da_giao")
            if not orders.exists():
                return JsonResponse({'message': 'Người dùng chưa có đơn hàng nào được được giao.'}, status=400)
            total_points = sum(
                item.quantity * 2 for order in orders for item in OrderItem.objects.filter(order=order)
            )
            user.Point = int(user.Point) + total_points
            user.save()
            return JsonResponse({
                'message': 'Tích điểm thành công!',
                'current_points': user.Point,
                'points_added': total_points
            }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Dữ liệu gửi lên không hợp lệ.'}, status=400)

        except Exception as e:
            return JsonResponse({'message': 'Đã xảy ra lỗi.', 'error': str(e)}, status=500)

    return JsonResponse({'message': 'Phương thức không được hỗ trợ.'}, status=405)


@csrf_exempt
@login_required
def redeem_gift(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            reward_id = data.get("product_id")
            reward_points = data.get("points")
            # Kiểm tra nếu reward_id hoặc reward_points bị thiếu
            if reward_id is None or reward_points is None:
                return JsonResponse({"error": "Thiếu thông tin quà tặng hoặc số điểm."}, status=400)
            try:
                reward_points = int(reward_points)
            except ValueError:
                return JsonResponse({"error": "Số điểm phải là một số nguyên hợp lệ."}, status=400)
            user = request.user
            user_points = int(user.Point)

            if user_points < reward_points:
                return JsonResponse({"error": "Bạn không đủ điểm để đổi quà này."}, status=400)

            reward = get_object_or_404(Reward, id=reward_id)
            user.Point = str(user_points - reward_points)
            user.save()

            # Thêm quà vào giỏ hàng
            cart_item = CartItem.objects.create(
                user=user,
                product=None,  # Không liên kết với bảng Product
                quantity=1,
                price=0,  # Giá trị là 0 vì đây là quà tặng
                image_url=reward.img_url,
            )

            return JsonResponse({
                "message": "Đổi quà thành công!",
                "cart_item": {
                    "id": cart_item.id,
                    "product_name": reward.product_name,
                    "quantity": cart_item.quantity,
                    "image_url": cart_item.image_url,
                }
            }, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu gửi lên không hợp lệ."}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Phương thức không được hỗ trợ."}, status=405)

def check_order_by_phone(request):
    phone_number = request.GET.get('phone', '').strip()
    
    # Kiểm tra nếu không nhập hoặc không đủ 10 số
    if not phone_number or not re.fullmatch(r'\d{10}', phone_number):
        return JsonResponse({"error": "Số điện thoại không hợp lệ! Vui lòng nhập đúng 10 chữ số."}, status=400)

    orders = Order.objects.filter(phone_number=phone_number).order_by("-id")
    
    if not orders.exists():
        return JsonResponse({"error": "Không tìm thấy đơn hàng nào!"}, status=404)
    
    order_data = []
    for order in orders:
        items = OrderItem.objects.filter(order=order).select_related("product")
        order_items = [
            {
                "product_name": item.product.name,
                "quantity": item.quantity,
                "price": item.price
            }
            for item in items
        ]
        order_data.append({
            "order_id": order.id,
            "status": order.status,
            "total_price": order.total_price,
            "items": order_items,
            "created_at": order.created_at.strftime("%d/%m/%Y %H:%M")
        })
    
    return JsonResponse({"orders": order_data}, safe=False)

@csrf_exempt
@login_required
def apply_voucher(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            voucher_code = data.get("voucher_code", "").strip()

            if not voucher_code:
                return JsonResponse({"error": "Vui lòng nhập mã giảm giá."}, status=400)

            # Tìm voucher trong CSDL
            voucher = Voucher.objects.filter(code=voucher_code, expiration_date__gte=now().date()).first()

            if not voucher:
                return JsonResponse({"error": "Mã giảm giá không hợp lệ hoặc đã hết hạn."}, status=400)

            cart_items = CartItem.objects.filter(user=request.user)
            if not cart_items.exists():
                return JsonResponse({"error": "Giỏ hàng trống."}, status=400)

            total_price = sum(item.price * item.quantity for item in cart_items)

            # Kiểm tra điều kiện đơn hàng tối thiểu
            if voucher.minimum_order_value and total_price < voucher.minimum_order_value:
                return JsonResponse({"error": f"Đơn hàng tối thiểu phải đạt {voucher.minimum_order_value}đ để sử dụng mã này."}, status=400)

            # Tính toán số tiền giảm giá
            discount_amount = voucher.discount_value if voucher.discount_value else (total_price * voucher.discount_percent / 100)
            final_price = max(0, total_price - discount_amount)

            return JsonResponse({
                "message": "Áp dụng mã giảm giá thành công!",
                "discount_amount": discount_amount,
                "final_price": final_price
            }, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Phương thức không được hỗ trợ."}, status=405)
