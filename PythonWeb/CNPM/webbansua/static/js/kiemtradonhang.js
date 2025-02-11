// Khi quay laị update giỏ hàng
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
// Tim kiem san pham
document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search-box");
    const searchSuggestions = document.getElementById("search-suggestions");
    searchBox.addEventListener("input", async () => {
        const query = searchBox.value.trim();
        if (!query) {
            searchSuggestions.innerHTML = "";
            searchSuggestions.style.display = "none";
            return;
        }
        try {
            const response = await fetch(`/api/search/?q=${encodeURIComponent(query)}`);
            const products = await response.json();
            if (products.length === 0) {
                searchSuggestions.innerHTML = "<div>Không tìm thấy sản phẩm</div>";
            } else {
                searchSuggestions.innerHTML = products
                    .map(product => `
                        <div onclick="redirectToProduct(${product.id})">
                            <img src="${product.image_url}" alt="${product.name}" style="width: 50px; margin-right: 10px;">
                            ${product.name}
                        </div>
                    `)
                    .join("");
            }
            searchSuggestions.style.display = "block";
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
        }
    });
    document.addEventListener("click", (event) => {
        if (!searchBox.contains(event.target) && !searchSuggestions.contains(event.target)) {
            searchSuggestions.style.display = "none";
        }
    });
});
// Khi an sp tiem kiem chuyen tab chi tiet san pham
function redirectToProduct(productId) {
    window.location.href = `/Orderdetails/${productId}/`;
}
// Update quantity gio hang
const updateUserCartData = async () => {
    try {
        const response = await fetch("/api/user-cart/");
        let cartItems = await response.json();
        const totalQuantity = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
        const cartCounter = document.getElementById("valueGioHang");
        cartCounter.textContent = totalQuantity;
    } catch (error) {
        console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
};
// check danh sach don hang
document.addEventListener("DOMContentLoaded", () => {
    const phoneInput = document.getElementById("phone-input");
    const checkOrderBtn = document.getElementById("check-order-btn");
    const orderResult = document.getElementById("order-result");

    const fetchOrders = async (phone) => {
        try {
            const response = await fetch(`/api/check_order/?phone=${encodeURIComponent(phone)}`);
            const data = await response.json();

            if (!response.ok) {
                orderResult.innerHTML = `<p style="color: red;">${data.error}</p>`;
                return;
            }

            let html = "<h3>Danh sách đơn hàng:</h3>";
            data.orders.forEach(order => {
                html += `
                    <div class="order-box">
                        <p><strong>Mã đơn:</strong> ${order.order_id}</p>
                        <p><strong>Trạng thái:</strong> ${order.status}</p>
                        <p><strong>Ngày đặt:</strong> ${order.created_at}</p>
                        <p><strong>Tổng tiền:</strong> ${formatCurrency(order.total_price)}</p>
                        <h4>Sản phẩm:</h4>
                        <ul>
                            ${order.items.map(item => `
                                <li>${item.product_name} - SL: ${item.quantity} - ${formatCurrency(item.price)}</li>
                            `).join("")}
                        </ul>
                    </div>
                `;
            });

            orderResult.innerHTML = html;
        } catch (error) {
            console.error("Lỗi:", error);
            orderResult.innerHTML = `<p style="color: red;">Lỗi khi lấy dữ liệu đơn hàng!</p>`;
        }
    };

    checkOrderBtn.addEventListener("click", () => {
        const phone = phoneInput.value.trim();
        if (!phone.match(/^\d{10}$/)) {
            orderResult.innerHTML = `<p style="color: red;">Số điện thoại không hợp lệ!</p>`;
            return;
        }
        fetchOrders(phone);
    });
});
