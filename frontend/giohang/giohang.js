// Khởi tạo giỏ hàng từ localStorage hoặc giỏ hàng trống nếu chưa có
let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

const handleMua = (value) => {
  const { id, name, image, price } = value.dataset;
  
  const product = {
    id,
    name,
    image,
    price,
    quantity: 1,
  };

  // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
  const existingProduct = cartData.find((item) => item.id === id);
  
  if (existingProduct) {
    // Nếu sản phẩm đã có, tăng số lượng
    existingProduct.quantity += 1;
  } else {
    // Nếu sản phẩm chưa có, thêm mới vào giỏ
    cartData.push(product);
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem('cartData', JSON.stringify(cartData));

  // Cập nhật giỏ hàng trên giao diện
  updateCartData();
  
  alert("Đã thêm sản phẩm vào giỏ hàng");
};

const updateCartData = () => {
  // Cập nhật tổng số lượng sản phẩm trong giỏ hàng
  const cartCounter = document.getElementById("valueGioHang");
  const totalQuantity = cartData.reduce((sum, { quantity }) => sum + quantity, 0);
  cartCounter.textContent = totalQuantity;

  // Cập nhật giỏ hàng trong trang giỏ hàng
  const cartContainer = document.getElementById('cartItems');
  const emptyMessage = document.getElementById('emptyCartMessage');
  const summaryContainer = document.querySelector('.summary-container');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');

  if (cartData.length === 0) {
    emptyMessage.style.display = 'block';
    cartContainer.style.display = 'none';
    summaryContainer.style.display = 'none';
    return;
  }

  emptyMessage.style.display = 'none';
  cartContainer.style.display = 'block';
  summaryContainer.style.display = 'block';

  let subtotal = 0;

  cartContainer.innerHTML = cartData
    .map(({ id, name, image, price, quantity }) => {
      subtotal += parseInt(price.replace('.', ''), 10) * quantity;
      return `
        <div class="cart-item" id="cartItem-${id}">
          <div class="col-md-3">
            <div class="cartpic">
              <img style="width: 100px; padding: 13px;" src="${image}" alt="${name}">
              <div class="cartcount">${quantity}</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="carttitle">${name}</div>
            <div class="cartcount1">
              <i class="fa fa-minus addminus" onclick="updateQuantity('${id}', -1)"></i>
              <span>
                <input type="number" class="soluong" value="${quantity}" readonly>
              </span>
              <i class="fa fa-plus addplus" onclick="updateQuantity('${id}', 1)"></i>
            </div>
          </div>
          <div class="col-md-3">
            <span>${price}đ</span>
          </div>
        </div>
      `;
    })
    .join('');

  subtotalElement.textContent = formatCurrency(subtotal);
  totalElement.textContent = formatCurrency(subtotal); 
};

const formatCurrency = (value) => {
  return value.toLocaleString('vi-VN') + 'đ';
};

const updateQuantity = (id, change) => {
  const productIndex = cartData.findIndex(item => item.id === id);

  if (productIndex > -1) {
    cartData[productIndex].quantity += change;

    // Xóa sản phẩm nếu số lượng là 0
    if (cartData[productIndex].quantity <= 0) {
      cartData.splice(productIndex, 1); 
    }

    // Lưu giỏ hàng vào localStorage và cập nhật giao diện
    localStorage.setItem('cartData', JSON.stringify(cartData));
    updateCartData();
  }
};

// Cập nhật giỏ hàng khi trang được tải lại
document.addEventListener('DOMContentLoaded', () => {
  updateCartData();
});
