document.addEventListener("DOMContentLoaded", function () {
    const voucherContainer = document.getElementById("voucher-container");
    const rawData = voucherContainer.dataset.vouchers;


    try {
        const vouchers = JSON.parse(rawData); // Parse dữ liệu JSON

        // Render danh sách voucher
        vouchers.forEach(voucher => {
            const discount = voucher.discount_value
                ? `${parseFloat(voucher.discount_value).toLocaleString()}đ`
                : `${voucher.discount_percent || 0}%`;

            const minOrder = voucher.minimum_order_value
                ? `${parseFloat(voucher.minimum_order_value).toLocaleString()}k`
                : "Không có điều kiện";

            const expirationDate = voucher.expiration_date || "Không có ngày hết hạn";

            const voucherHTML = `
                <div class="itemvoucher">
                    <div class="voucher_header">
                        <span>${discount}</span>
                        <div class="thongtin">
                            <p>Cho đơn hàng online từ</p>
                            <p>${minOrder}</p>
                        </div>
                    </div>
                    <div class="voucher_footer">
                        <p>${voucher.brand || "Không rõ thương hiệu"}</p>
                        <span style="color: #ae0258; font-size: 11px;">Mã dành cho ${voucher.description || "Không có mô tả"}</span>
                        <div class="tile1">
                            <span style="color: #ae0258; font-size: 11px;">Đến ngày ${expirationDate}</span>
                            <div class="tile2">
                                <button style="border: none; background: none; color: white;">${voucher.code}</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            voucherContainer.innerHTML += voucherHTML;
        });
    } catch (error) {
        console.error("Error parsing vouchers data:", error);
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const brandItems = document.querySelectorAll(".brand-item");
    const productList = document.querySelector(".list_products_1");

    brandItems.forEach(item => {
        item.addEventListener("click", function () {
            const brandId = this.getAttribute("data-brand-id");

            // Gửi request tới server để lấy danh sách sản phẩm của thương hiệu
            fetch(`/purchase?brand_id=${brandId}`)
                .then(response => response.text())
                .then(html => {
                    // Lấy HTML sản phẩm từ server và cập nhật danh sách sản phẩm
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const newProducts = doc.querySelector(".list_products_1").innerHTML;
                    productList.innerHTML = newProducts;
                })
                .catch(error => console.error("Lỗi khi tải sản phẩm:", error));
        });
    });
});
const handleBuy = async (productId) => {
    try {
      const loginStatusResponse = await fetch("/api/check_login/");
      const loginStatus = await loginStatusResponse.json();
      if (!loginStatus.logged_in) {
        toast({
          title: "Warning",
          message: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!",
          type: "warning",
          duration: 3000,
        });
        return;
      }
      else {
        const productResponse = await fetch("/api/products/");
        const products = await productResponse.json();
        const product = products.find((item) => item.id === productId);
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
          title: "Success",
          message: "Đã thêm vào giỏ hàng",
          type: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        message: error.message || "Đã xảy ra lỗi, vui lòng thử lại!",
        type: "error",
        duration: 3000,
      });
    }
  };
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