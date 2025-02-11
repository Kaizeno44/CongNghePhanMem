const PHIGIAOHANG = 30000;
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
// Hien thi san pham co trong gio hang
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
                        <input type="text" placeholder="Nhập mã giảm giá">
                        <button class="ctn_button">Áp dụng</button>
                    </div>
                </div>`;
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
            productCartContainer.innerHTML += containerNhapVoucvher;
            productCartContainer.innerHTML += summaryHTML;
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
// Tạo order hàng 
const createOrder = async () => {
    try {
        const fullName = document.querySelector('input[placeholder="Họ tên"]').value;
        const address = document.querySelector('input[placeholder="Địa chỉ (ví dụ: 435 An Dương Vương)"]').value;
        const phoneNumber = document.querySelector('input[placeholder="Số điện thoại"]').value;
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
    document.querySelector('input[placeholder="Họ tên"]').value = "";
    document.querySelector('input[placeholder="Địa chỉ (ví dụ: 435 An Dương Vương)"]').value = "";
    document.querySelector('input[placeholder="Số điện thoại"]').value = "";
    document.querySelector('input[placeholder="Ghi chú thêm"]').value = "";
    showCart();
    const cartCounter = document.getElementById("valueGioHang").textContent;
    const pay_btn = document.querySelector(".pay-btn");
    if (parseInt(cartCounter) === 0 && pay_btn) {
        pay_btn.textContent = `Thanh toán 0đ (COD)`;
        pay_btn.disabled = true;
    }
};
const getTotalAmount = () => {
    const totalElement = document.querySelector(".sum1 span:last-child");
    if (totalElement) {
        let total = parseInt(totalElement.textContent.replace(/\D/g, ""), 10);
        return total + 30000;
    }
    return 0;
};

