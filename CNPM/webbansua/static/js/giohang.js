const PHIGIAOHANG = 30000;
const formatCurrency = (amount) => {
    if (!amount) return "0đ";
    return parseFloat(amount).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    }).replace("₫", "đ");
};

window.addEventListener("load", async () => {
    await updateUserCartData();
    await showCart();
});

const updateUserCartData = async () => {
    try {
        const loginStatusResponse = await fetch("/api/check_login/");
        const loginStatus = await loginStatusResponse.json();
        if (loginStatus.logged_in) {
            const response = await fetch("/api/user-cart/");
            const cartItems = await response.json();
            const cartCounter = document.getElementById("valueGioHang");
            const totalQuantity = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
            cartCounter.textContent = totalQuantity;
        }
    } catch (error) {
        toast({
            title: "Lỗi",
            message: error.message,
            type: "error",
            duration: 3000,
        });
    }
};
const showCart = async () => {
    try {
        const response = await fetch("/api/user-cart/");
        const data = await response.json();
        const productCartContainer = document.getElementById("product_Cart");
        let cartProducts = "";
        let subtotal = 0;
        let total = 0;
        if (data.length > 0) {
            data.forEach(product => {
                const itemTotal = product.price * product.quantity;
                subtotal += itemTotal;
                total = subtotal + PHIGIAOHANG;
                cartProducts += `
                <div class="cart-item">
                  <div class="col-md-3">
                    <div class="cartpic">
                      <img style="width: 100px; padding: 13px;" src="${product.image_url}" alt="${product.product_name}">
                      <div class="cartcount">${product.quantity}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="carttitle">${product.product_name}</div>
                    <div class="cartcount1">
                      <i class="fa fa-minus addminus add-minus" data-gid="${product.id}"></i>
                      <span>
                        <input class="soluong${product.id}" type="number" min="1" max="100" name="txt_soluong" value="${product.quantity}">
                      </span>
                      <i class="fa fa-plus add-plus" data-gid="${product.id}"></i>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="cartprice"> ${formatCurrency(product.price)}</div>
                  </div>
                </div>`;
            });
            productCartContainer.innerHTML = cartProducts || `<p>Không có sản phẩm</p>`;
            const nhapVoucher = `
            <div class="apvoucheandgia">
                    <div class="apvoucher">
                        <input type="text" placeholder="Nhập mã giảm giá">
                        <button class="ctn_button">Áp dụng</button>
                    </div>`
            const summaryHTML = `
            <div class="summary" style="border-bottom:2px solid gainsboro;">
                <div class="sum1">
                    <p>Tạm tính: </p> <span>${formatCurrency(subtotal)}</span>
                </div>
                <div class="sum1">
                    <p>Giảm giá: </p> <span>0đ</span>
                </div>
                <div class="sum1">
                    <p>Phí giao hàng: </p> <span>${formatCurrency(PHIGIAOHANG)}</span>
                </div>
            </div>
            <div class="sum1">
                <p><strong>Tổng: </strong></p> <span>${formatCurrency(total)}</span>
            </div>`;
            productCartContainer.innerHTML += nhapVoucher;
            productCartContainer.innerHTML += summaryHTML;
        } else {
            productCartContainer.innerHTML = `<p>Giỏ hàng trống</p>`;
        }
        const pay_btn = document.querySelector(".pay-btn");
        if (pay_btn) {
            pay_btn.textContent = `Thanh toán ${formatCurrency(total)} (COD)`;
        }
    } catch (error) {
        console.error("Error fetching cart items:", error.message);
    }
};
