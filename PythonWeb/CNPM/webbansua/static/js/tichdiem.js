// Khi quay laị update giỏ hàng
window.addEventListener("pageshow", async () => {
    await updateUserCartData();
});
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
        const loginStatusResponse = await fetch("/api/check_login/");
        const loginStatus = await loginStatusResponse.json();

        if (loginStatus.logged_in) {
            const response = await fetch("/api/user-cart/");
            let cartItems = await response.json();

            // Đảm bảo cartItems là mảng
            cartItems = Array.isArray(cartItems) ? cartItems : [];

            const cartCounter = document.getElementById("valueGioHang");
            const totalQuantity = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
            cartCounter.textContent = totalQuantity;
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật giỏ hàng:", error);
        alert("Không thể cập nhật giỏ hàng, vui lòng thử lại.");
    }
};

document.addEventListener("DOMContentLoaded", function () {
    // Tích điểm và gửi yêu cầu đến backend
    async function addPoints() {
        const phoneInput = document.querySelector("input[type='tel']").value;
        // Kiểm tra số điện thoại có đúng định dạng không
        if (phoneInput.length !== 10 || isNaN(phoneInput)) {
            toast({
                title: "Warning",
                message: "Vui lòng nhập đúng số điện thoại (10 số)!",
                type: "warning",
                duration: 3000,
            });
            return;
        }
        try {
            const response = await fetch("/api/Earnpoints/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone: phoneInput }),
            });
            const result = await response.json();
            if (response.status === 200) {
                toast({
                    title: "Success",
                    message: `Tích điểm thành công! Điểm hiện tại: ${result.current_points}`,
                    type: "success",
                    duration: 3000,
                });
            } else {
                toast({
                    title: "Warning",
                    message: `${result.message}`,
                    type: "warning",
                    duration: 3000,
                });
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            alert("Không thể kết nối đến máy chủ, vui lòng thử lại sau.");
        }
    }
    document.querySelector("button").addEventListener("click", addPoints);
});