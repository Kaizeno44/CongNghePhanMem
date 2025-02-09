const formatCurrency = (amount) => {
    if (!amount) return "0đ";
    return parseFloat(amount).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    }).replace("₫", "đ");
};
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
// Hien thi chi tiet san pham
document.addEventListener("DOMContentLoaded", async () => {
    const productId = window.location.pathname.split("/").slice(-2, -1)[0];  
    try {
        const response = await fetch(`/api/product/${productId}/`);
        const product = await response.json();
        const productHTML = `
            <div class="container_chi_tiet_contens">
                <div class="left_container_chi_tiet">
                    <div class="khung_anh">
                        <div class="anh">
                            <img src="${product.image_url}" alt="Lỗi hiển thị">
                        </div>
                    </div>
                </div>
                <div class="right_container_chi_tiet">
                    <div class="tiltle_sp">
                        <div class="details-titleshop">${product.name}</div>
                        <div class="details-masp">Mã sản phẩm: ${product.id}</div>
                        <div class="trangthai">
                            Trạng thái: <span>${product.status === "con_hang" ? "Còn hàng" : "Hết hàng"}</span>
                        </div>
                        <div class="gia_sp">
                            ${formatCurrency(product.price)}
                            ${product.sale_price ? `<span style="text-decoration: line-through; color: red;">${formatCurrency(product.sale_price)}</span>` : ""}
                        </div>
                        <div class="nd">
                            <p>${product.description}</p>
                        </div>
                        <div class="details-pay">
                            <a href="javascript:void(0);" onclick="handleBuyNow(${product.id})">
                                <img src="/static/img/muangay.jpg" alt="Mua ngay">
                            </a>
                            --- Hoặc ---
                            <a href="javascript:void(0);" onclick="handleAddToCart(${product.id})">
                                <img src="/static/img/ThemVaoGioHang.jpg" alt="Thêm vào giỏ hàng">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById("product-details").innerHTML = productHTML;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
});
// Su kien click chon mua ngay
const handleBuyNow = async (productId) => {
    try {
        const loginStatusResponse = await fetch("/api/check_login/");
        const loginStatus = await loginStatusResponse.json();
        if (!loginStatus.logged_in) {
            toast({
                title: "Cảnh báo",
                message: "Bạn cần đăng nhập để mua hàng!",
                type: "warning",
                duration: 3000,
            });
            return;
        }
        const productResponse = await fetch(`/api/product/${productId}/`);
        const product = await productResponse.json();
        const cartItemData = {
            product: product.name,
            quantity: 1,
        };
        const csrfToken = getCSRFToken();
        const response = await fetch("/api/cartitem/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(cartItemData),
        });
        const updatedCartData = await fetch("/api/cartitem/");
        const updatedCartItems = await updatedCartData.json();
        updateUserCartData(updatedCartItems);
        window.location.href = "/shoppingcart/";
        toast({
            title: "Thành công",
            message: "Sản phẩm đã được thêm vào giỏ hàng",
            type: "success",
            duration: 3000,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        toast({
            title: "Lỗi",
            message: error.message || "Có lỗi xảy ra, vui lòng thử lại!",
            type: "error",
            duration: 3000,
        });
    }
};
// Su kien click chon them vao gio hang
const handleAddToCart = async (productId) => {
    try {
        const loginStatusResponse = await fetch("/api/check_login/");
        const loginStatus = await loginStatusResponse.json();
        if (!loginStatus.logged_in) {
            toast({
                title: "Cảnh báo",
                message: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!",
                type: "warning",
                duration: 3000,
            });
            return;
        }
        const productResponse = await fetch(`/api/product/${productId}/`);
        const product = await productResponse.json();
        const cartItemData = {
            product: product.name,
            quantity: 1,
        };

        const csrfToken = getCSRFToken();
        const response = await fetch("/api/cartitem/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(cartItemData),
        });
        const updatedCartData = await fetch("/api/cartitem/");
        const updatedCartItems = await updatedCartData.json();
        updateUserCartData(updatedCartItems);
        toast({
            title: "Thành công",
            message: "Sản phẩm đã được thêm vào giỏ hàng",
            type: "success",
            duration: 3000,
        });
    } catch (error) {
        toast({
            title: "Lỗi",
            message: error.message || "Có lỗi xảy ra, vui lòng thử lại!",
            type: "error",
            duration: 3000,
        });
    }
};
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
// Hien thi san pham voi catetory
const loadRelatedProducts = async (productId) => {
    try {
        const response = await fetch(`/api/product/${productId}/related/`);
        const relatedProducts = await response.json();
        let relatedHTML = "";
        
        relatedProducts.forEach(product => {
            let giamPhanTram = "";
            if (product.sale_price && product.price && product.sale_price > product.price) {
                const giam = Math.round(((product.sale_price - product.price) / product.sale_price) * 100);
                giamPhanTram = `- ${giam}%`;
            }
            
            relatedHTML += `
                <div class="item_products">
                    <div class="inside-flas isspbc" style="position: relative;">
                        ${giamPhanTram ? `<div class="home-sua-percent"><span>${giamPhanTram}</span></div>` : ""}
                        <a style="text-decoration: none;" href="/Orderdetails/${product.id}/">
                            <div class="flashsale-pic"><img src="${product.image_url}" alt="${product.name}"></div>
                            <div class="flashsale-title">${product.name}</div>
                        </a>
                        <div>
                            <div class="title_gia" style="display: flex; margin-bottom: 5px;">
                                <div class="col-md-6 paddL0"><div class="sales-price">${formatCurrency(product.price)}</div></div>
                                <div class="col-md-6"><div class="sales-root">${product.sale_price ? formatCurrency(product.sale_price) : ""}</div></div>
                            </div>
                            <div class="chonmua_buy_fast"><a onclick="handleBuy(${product.id})">Chọn mua</a></div>
                        </div>
                    </div>
                </div>`;
        });

        document.querySelector(".list_products_1").innerHTML = relatedHTML;
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm liên quan:", error);
    }
};
document.addEventListener("DOMContentLoaded", async () => {
    const productId = window.location.pathname.split("/").slice(-2, -1)[0];  
    await loadRelatedProducts(productId);
});
