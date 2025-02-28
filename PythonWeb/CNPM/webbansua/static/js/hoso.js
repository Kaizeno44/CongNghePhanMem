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

// Hiern thi thong tin khach hang
window.addEventListener("load", async () => {
    try {
        const response = await fetch("/api/currentuser/");
        const user = await response.json();
        const proFile = document.getElementById("proFile");
        const phoneNumber = user.phone_number ? user.phone_number : "";
        if (user) {
            proFile.innerHTML = `
                <div class="info">
                    <div><span>Tên đăng nhập:</span> ${user.username}</div>
                    <div><span>Số điện thoại:</span> ${phoneNumber}</div>
                    <div><span>Điểm:</span> ${user.points} <i class="fa fa-star" aria-hidden="true"></i></div>
                </div>`;
        } else {
            proFile.innerHTML = `<p>Không tìm thấy thông tin tài khoản.</p>`;
        }
    } catch (error) {
        document.getElementById("proFile").innerHTML = `<p>Có lỗi xảy ra, vui lòng thử lại.</p>`;
    }
});
