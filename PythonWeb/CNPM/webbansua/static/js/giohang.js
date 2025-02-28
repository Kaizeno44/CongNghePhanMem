const PHIGIAOHANG = 30000;
let discountAmount = 0;  

window.addEventListener("pageshow", async () => {
    await updateUserCartData();
});
const formatCurrency = (amount) => {
    if (!amount) return "0đ";
    return parseFloat(amount).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    }).replace("₫", "đ");
};
const getCSRFToken = () => {
    const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];
    return csrfToken || "";
};
window.addEventListener("load", async () => {
    await updateUserCartData();
    await showCart();
    resetThongTin();
});
// update quantity gio hang
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
// update quantity khi + or -
const updateQuantity = async (cartItemId, newQuantity) => {
    try {
        const response = await fetch("/api/cartitem/update/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
            },
            body: JSON.stringify({ id: cartItemId, quantity: newQuantity }),
        });
        await showCart();
    } catch (error) {
        console.error("Error updating cart item:", error.message);
    }
};
// Su kien cong va tru sp
const pushAndMinus = () => {
    const minusButtons = document.querySelectorAll(".add-minus");
    const plusButtons = document.querySelectorAll(".add-plus");
    minusButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const cartItemId = btn.getAttribute("data-gid");
            const quantityInput = document.querySelector(`.soluong${cartItemId}`);
            let newQuantity = parseInt(quantityInput.value) - 1;
            if (newQuantity < 1) {
                deleteCartItem(cartItemId);
            } else {
                updateQuantity(cartItemId, newQuantity);
            }
            updateUserCartData();
        });
    });
    plusButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const cartItemId = btn.getAttribute("data-gid");
            const quantityInput = document.querySelector(`.soluong${cartItemId}`);
            let newQuantity = parseInt(quantityInput.value) + 1;
            updateQuantity(cartItemId, newQuantity);
            updateUserCartData();

        });
    });
};
// Xoa sp khi sp về 0
const deleteCartItem = async (cartItemId) => {
    try {
        const response = await fetch("/api/cartitem/delete/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
            },
            body: JSON.stringify({ id: cartItemId }),
        });

        if (response.ok) {
            toast({
                title: "Success",
                message: "Xóa sản phẩm thành công!",
                type: "success",
                duration: 3000,
            });
            showCart();
            updateUserCartData();
        }
    } catch (error) {
        console.error("Error deleting cart item:", error.message);
    }
};
// Tạo order hàng 
const createOrder = async () => {
    try {
        const fullName = document.querySelector('input[placeholder="Họ tên (ví dụ: Bùi Văn Huy)"]').value;
        const address = document.querySelector('input[placeholder="Địa chỉ (ví dụ: 435 An Dương Vương)"]').value;
        const phoneNumber = document.querySelector('input[placeholder="Số điện thoại"]').value;
        console.log(fullName, address, phoneNumber);
        const notes = document.querySelector('input[placeholder="Ghi chú thêm"]').value;
        const bankTransferRadio = document.getElementById("bank_transfer");
        const codRadio = document.getElementById("cod");
        const qrContainer = document.getElementById("qr_container");
        const qrCodeImg = document.getElementById("qr_code");
        if (!fullName || !address || !phoneNumber) {
            toast({
                title: "Warning",
                message: "Bạn cần điền đầy đủ thông tin!",
                type: "warning",
                duration: 3000,
            });
            return;
        }
        if (phoneNumber.length !== 10) {
            toast({
                title: "Warning",
                message: "Điền đúng số điện thoại gồm 10!",
                type: "warning",
                duration: 3000
            });
            return;
        }
        let paymentMethod = "cod"; 
        if (bankTransferRadio.checked) {
            paymentMethod = "bank_transfer";
        }
        if (paymentMethod === "bank_transfer") {
            const totalAmount = getTotalAmount();
            const transferNote = `Thanh toán đơn hàng - ${phoneNumber}`;
            const info = {
                url: "https://img.vietqr.io/image/TCB-6664466666-compact2.png",
                amount: totalAmount,
                addInfo: transferNote, 
                accountName: "BUI VAN HUY",
            };
            const qrUrl = `${info.url}?amount=${info.amount}&addInfo=${encodeURIComponent(info.addInfo)}&accountName=${encodeURIComponent(info.accountName)}`;
            qrCodeImg.src = qrUrl;
            qrContainer.style.display = "block";
        }
        const response = await fetch("/api/order/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
            },
            body: JSON.stringify({
                full_name: fullName,
                address: address,
                phone_number: phoneNumber,
                notes: notes,
                payment_method: paymentMethod,
            }),
        });
        if (response.ok) {
            toast({
                title: "Success",
                message: "Đặt hàng thành công!",
                type: "success",
                duration: 3000,
            });
            resetThongTin();
            updateUserCartData();
        }
    } catch (error) {
        console.error("Error creating order:", error.message);
    }
};


const resetThongTin = () => {
    const fullNameInput = document.querySelector('input[placeholder="Họ tên"]');
    const addressInput = document.querySelector('input[placeholder="Địa chỉ (ví dụ: 435 An Dương Vương)"]');
    const phoneInput = document.querySelector('input[placeholder="Số điện thoại"]');

    if (fullNameInput) fullNameInput.value = "";
    if (addressInput) addressInput.value = "";
    if (phoneInput) phoneInput.value = "";

    showCart();
    const cartCounter = document.getElementById("valueGioHang").textContent;
    const payBtn = document.querySelector(".pay-btn");
    if (parseInt(cartCounter) === 0 && payBtn) {
        payBtn.textContent = `Thanh toán 0đ (COD)`;
        payBtn.disabled = true;
    }
};

const getTotalAmount = () => {
    const totalElement = document.querySelector(".sum1 span:last-child");
    let total = 0;
    if (totalElement) {
        total = parseInt(totalElement.textContent.replace(/\D/g, ""), 10);
    }
    return total;
};

// hien thi sp gio hang
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
                      <i class="fa fa-minus addminus add-minus" data-gid="${product.id}" style ="cursor: pointer;"></i>
                      <span>
                        <input class="soluong${product.id}" type="number" min="1" max="100" name="txt_soluong" value="${product.quantity}">
                      </span>
                      <i class="fa fa-plus add-plus" data-gid="${product.id}" style ="cursor: pointer;"></i>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="cartprice">${formatCurrency(product.price)}</div>
                  </div>
                </div>`;
            });
            productCartContainer.innerHTML = cartProducts;
            const containerNhapVoucvher = `
            <div class="apvoucheandgia">
                <div class="apvoucher">
                    <input type="text" placeholder="Nhập mã giảm giá" id="input_voucher">
                    <button class="ctn_button" id="xacnhan_voucher" onclick="handleVoucher()">Áp dụng</button>
                </div>
            </div>`;
            const summaryHTML = `
            <div class="summary" style="border-bottom:2px solid gainsboro;">
                <div class="sum1">
                    <p>Tạm tính: </p> <span>${formatCurrency(subtotal)}</span>
                </div>
                <div class="sum1">
                    <p>Giảm giá: </p> <span id="tien_giam_gia">- ${formatCurrency(discountAmount)}</span>
                </div>
                <div class="sum1">
                    <p>Phí giao hàng: </p> <span>${formatCurrency(PHIGIAOHANG)}</span>
                </div>
            </div>
            <div class="sum1">
                <p><strong>Tổng: </strong></p> <span>${formatCurrency(subtotal + PHIGIAOHANG - discountAmount)}</span>
            </div>`;
            productCartContainer.innerHTML += containerNhapVoucvher;
            productCartContainer.innerHTML += summaryHTML;
            total = subtotal + PHIGIAOHANG - discountAmount;
            const pay_btn = document.querySelector(".pay-btn");
            if (pay_btn) {
                pay_btn.textContent = `Thanh toán ${formatCurrency(total)} (COD)`;
                pay_btn.disabled = false;
            }
            pushAndMinus();
        } else {
            productCartContainer.innerHTML = `<p>Giỏ hàng trống</p>`;
        }
    } catch (error) {
        console.error("Error fetching cart items:", error.message);
    }
};
// xu li voucher
const handleVoucher = async () => {
    const input_voucher = document.getElementById('input_voucher');
    const voucherCode = input_voucher.value.trim();
    if (!voucherCode) {
        toast({
            title: "Warning",
            message: "Vui lòng nhập mã giảm giá!",
            type: "warning",
            duration: 3000,
          });
        return;
    }
    try {
        const response = await fetch("/api/apply_voucher/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
            },
            body: JSON.stringify({ voucher_code: voucherCode }),
        });
        const result = await response.json();
        if (response.ok) {
            toast({
                title: "Success",
                message: `Mã giảm giá áp dụng thành công! Giảm giá: ${formatCurrency(result.discount_amount)}`,
                type: "success",
                duration: 3000,
              });
            discountAmount = result.discount_amount; 
            showCart();
        } else {
            toast({
                title: "Warning",
                message: `${result.error}`,
                type: "warning",
                duration: 3000,
              });
        }
    } catch (error) {
        console.error("Lỗi khi áp dụng mã giảm giá:", error);
    }
};
// update gia giam
const updateCartSummary = (discountAmount) => {
    const tien_giam_gia = document.getElementById("tien_giam_gia");
    const totalElement = document.querySelector(".summary .sum1:nth-child(4) span");
    if (tien_giam_gia && totalElement) {
        tien_giam_gia.textContent = formatCurrency(discountAmount);
        let total = getTotalAmount() - discountAmount;
        totalElement.textContent = formatCurrency(total);
    }
};



