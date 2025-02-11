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
document.addEventListener("DOMContentLoaded", () => {
    // Định nghĩa URL bài viết cho từng phần tử
    const articles = [
        {
            imageSelector: ".container_kienThuc_top .bg_kienthuc .anh_bg img",
            descriptionSelector: ".container_kienThuc_top .bg_kienthuc .tilte_bg > p",
            url: "https://dantri.com.vn/suc-khoe/bi-quyet-nuoi-con-cao-lon-cua-nguoi-nhat-20220405235701665.htm"
        },
        {
            imageSelector: ".container_kienThuc_bottom .item_kien_thuc:nth-child(1) .anh_kienthuc img",
            descriptionSelector: ".container_kienThuc_bottom .item_kien_thuc:nth-child(1) .glock-title",
            url: "https://infonet.vietnamnet.vn/du-ban-ron-den-dau-cha-me-cung-khong-nen-cho-tre-an-nhung-thuc-pham-nay-vao-buoi-sang-277499.html"
        },
        {
            imageSelector: ".container_kienThuc_bottom .item_kien_thuc:nth-child(2) .anh_kienthuc img",
            descriptionSelector: ".container_kienThuc_bottom .item_kien_thuc:nth-child(2) .glock-title",
            url: "https://www.vinmec.com/vie/bai-viet/nhan-biet-chuong-bung-day-hoi-o-tre-em-vi"
        },
        {
            imageSelector: ".container_kienThuc_bottom .item_kien_thuc:nth-child(3) .anh_kienthuc img",
            descriptionSelector: ".container_kienThuc_bottom .item_kien_thuc:nth-child(3) .glock-title",
            url: "https://nhatban.vn/thuc-pham-bo-nao-cho-tre-em/"
        },
        {
            imageSelector: ".container_kienThuc_bottom .item_kien_thuc:nth-child(4) .anh_kienthuc img",
            descriptionSelector: ".container_kienThuc_bottom .item_kien_thuc:nth-child(4) .glock-title",
            url: "https://suckhoedoisong.vn/10-viec-bo-nen-lam-trong-giai-doan-con-bu-sua-me-16993707.htm"
        },
        {
            imageSelector: ".mainkt .list_mainkt .container_kienThuc .container_kienThuc_top:nth-child(1) .bg_kienthuc_1 .anh_bg img",
            descriptionSelector: ".mainkt .list_mainkt .container_kienThuc .container_kienThuc_top:nth-child(1) .tilte_bg a",
            url: "https://afamily.vn/nhung-cot-moc-phat-trien-cua-tre-va-bi-quyet-tang-chieu-cao-huu-hieu-20150512071543954.chn"
        },
        {
            imageSelector: ".mainkt .list_mainkt .container_kienThuc .container_kienThuc_top:nth-child(2) .bg_kienthuc_1 .anh_bg img",
            descriptionSelector: ".mainkt .list_mainkt .container_kienThuc .container_kienThuc_top:nth-child(2) .tilte_bg a",
            url: "https://afamily.vn/7-san-pham-cho-tre-em-de-chua-chat-doc-hai-cac-me-nen-biet-20150202111556459.chn"
        },
        {
            imageSelector: ".mainkt .list_mainkt .container_kienThuc .container_kienThuc_top:nth-child(3) .bg_kienthuc_1 .anh_bg img",
            descriptionSelector: ".mainkt .list_mainkt .container_kienThuc .container_kienThuc_top:nth-child(3) .tilte_bg a",
            url: "https://infonet.vietnamnet.vn/du-ban-ron-den-dau-cha-me-cung-khong-nen-cho-tre-an-nhung-thuc-pham-nay-vao-buoi-sang-277499.html"
        }
    ];

    // Duyệt qua từng bài viết và thêm sự kiện
    articles.forEach(article => {
        const imageElement = document.querySelector(article.imageSelector);
        const descriptionElement = document.querySelector(article.descriptionSelector);

        // Hàm mở tab mới với URL
        const openArticleInNewTab = () => {
            window.open(article.url, "_blank");
        };

        // Gắn sự kiện click
        if (imageElement) {
            imageElement.addEventListener("click", openArticleInNewTab);
        }
        if (descriptionElement) {
            descriptionElement.addEventListener("click", openArticleInNewTab);
        }
    });
});

