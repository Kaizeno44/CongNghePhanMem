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
        const response = await fetch("/api/user-cart/");
        let cartItems = await response.json();
        const totalQuantity = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
        const cartCounter = document.getElementById("valueGioHang");
        cartCounter.textContent = totalQuantity;
    } catch (error) {
        console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
};
// hien thi cacs san pham doi
document.addEventListener("DOMContentLoaded", async () => {
    const rewardsContainer = document.getElementById("rewardsContainer");
    const rewardsContainer_1 = document.getElementById("rewardsContainer_1");
    try {
        const response = await fetch("/api/rewards/");
        const dataDoiQua = await response.json();
        if (dataDoiQua.length > 0) {
            const maxItemsPerRow = 4; 
            let itemDoiQua = "";
            let itemDoiQua1 = "";

            // Hàng đầu tiên: Hiển thị sản phẩm từ 0 đến 3
            dataDoiQua.slice(0, maxItemsPerRow).forEach((item) => {
                itemDoiQua += `
                    <div class="item_doiqua">
                        <div class="anh_qua">
                            <img src="${item.img_url}" alt="${item.product_name}">
                        </div>
                        <p>${item.product_name}</p>
                        <div class="thong_tindoi">
                            <div class="thongtin1">
                                <strong>${item.points}</strong>
                                <i class="fa fa-star" aria-hidden="true"></i>
                            </div>
                            <div class="thongtin2" onclick="doiQua(${item.id}, ${item.points})">
                                <span >Đổi quà</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Hàng thứ hai: Hiển thị sản phẩm từ 4 đến 7
            dataDoiQua.slice(maxItemsPerRow, maxItemsPerRow * 2).forEach((item) => {
                itemDoiQua1 += `
                    <div class="item_doiqua">
                        <div class="anh_qua">
                            <img src="${item.img_url}" alt="${item.product_name}">
                        </div>
                        <p>${item.product_name}</p>
                        <div class="thong_tindoi">
                            <div class="thongtin1">
                                <strong>${item.points}</strong>
                                <i class="fa fa-star" aria-hidden="true"></i>
                            </div>
                            <div class="thongtin2" onclick="doiQua(${item.id}, ${item.points})">
                                <span>Đổi quà</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            rewardsContainer.innerHTML = itemDoiQua;
            rewardsContainer_1.innerHTML = itemDoiQua1;


        } else {
            rewardsContainer.innerHTML = `<p>Không có quà tặng nào.</p>`;
            rewardsContainer_1.innerHTML = `<p>Không có quà tặng nào.</p>`;

        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        rewardsContainer.innerHTML = `<p>Không thể tải danh sách quà. Vui lòng thử lại sau.</p>`;
    }
});

const doiQua = async (rewardId, requiredPoints) => {
    try {
        const loginStatusResponse = await fetch("/api/check_login/");
        const loginStatus = await loginStatusResponse.json();

        if (!loginStatus.logged_in) {
            toast({
                title: "Warning",
                message: "Bạn cần đăng nhập để đổi quà!",
                type: "warning",
                duration: 3000,
            });
            return;
        }
        const response = await fetch('/api/redeem_gift/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify({
                product_id: rewardId,
                points: parseInt(requiredPoints, 10),
            }),
        });
        const result = await response.json();
        if (response.ok) {
            toast({
                title: "Success",
                message: `Đổi quà thành công! Bạn đã nhận: ${result.cart_item.product_name}`,
                type: "success",
                duration: 3000,
            });
            await updateUserCartData(); 
        } else {
            toast({
                title: "Warning",
                message: `${result.error}`,
                type: "warning",
                duration: 3000,
            });
        }
    } catch (error) {
        console.error('Lỗi khi đổi quà:', error);
        toast({
            title: "Error",
            message: "Có lỗi xảy ra, vui lòng thử lại sau!",
            type: "error",
            duration: 3000,
        });
    }
};
