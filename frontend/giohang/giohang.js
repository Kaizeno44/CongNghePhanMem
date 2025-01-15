

const getProduct = (item) => {
  const products = JSON.parse(localStorage.getItem("cartItems")) || [];
  const infoProductCart = products.find((sp) => item.id === sp.id) || {};
  return {
    ...infoProductCart,
    ...item,
  };
};

const showCart = () => {
  const cartItems = document.getElementById("cartItems");

  // Kiểm tra nếu phần tử tồn tại
  if (!cartItems) {
    console.error("Phần tử cartItems không tồn tại.");
    return;
  }

  // Kiểm tra dữ liệu giỏ hàng
  const itemProducts = JSON.parse(localStorage.getItem("cartData")) || [];
  if (itemProducts.length === 0) {
    cartItems.innerHTML = `<div class="tb_Cart">Chưa có sản phẩm trong giỏ</div>`;
  } else {
    let productsHtml = "";

    itemProducts.forEach((item) => {
      const product = getProduct(item);
      console.log(product, "product");

      productsHtml += `
        <div class="col-md-3">
          <div class="cartpic">
            <img style="width: 100px; padding: 13px;" src="${product.image}" alt="${product.name}">
            <div class="cartcount">${product.quantity}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="carttitle">${product.name}</div>
          <div class="cartcount1">
            <i class="fa fa-minus addminus add-minus" data-gid="${product.id}"></i>
            <span>
              <input class="soluong${product.id}" type="number" min = "1" max = "100"  name="txt_soluong" value="${product.quantity}">
            </span>
            <i class="fa fa-plus add-plus" data-gid="${product.id}"></i>
          </div>
        </div>
      `;
    });

    // Chèn nội dung HTML vào phần tử cartItems
    cartItems.innerHTML = `
      <div class="cart-content">
        ${productsHtml}
      </div>
      <div class="apvoucheandgia">
        <div class="apvoucher">
          <input type="text" placeholder="Nhập mã giảm giá">
          <button class="ctn_button">Áp dụng</button>
        </div>
        <div class="gia">
          <span>410.000đ</span>
        </div>
      </div>
      <div class="summary" style="border-bottom:2px solid gainsboro;">
        <div class="sum1">
          <p>Tạm tính:</p> <span>410.000đ</span>
        </div>
        <div class="sum1">
          <p>Giảm giá:</p> <span>0đ</span>
        </div>
        <div class="sum1">
          <p>Phí giao hàng:</p> <span>0đ</span>
        </div>
      </div>
      <div class="sum1">
        <p><strong>Tổng:</strong></p> <span>410.000đ</span>
      </div>
      <button class="pay-btn">Thanh toán 410.000đ (COD)</button>
    `;
  }
};

// Hàm mở giỏ hàng
const openCart = () => {
  showCart();
};

// Gọi hàm mở giỏ hàng khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
  openCart();
});
