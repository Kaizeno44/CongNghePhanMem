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
window.addEventListener("load", async () => {
  try {
      const response = await fetch("/api/promotion/");
      const dataKM = await response.json();
      const ct_Khuyen_Mai = document.getElementById("ct_Khuyen_Mai");
      let itemKM = "";

      if (dataKM.length > 0) {
          dataKM.forEach((item) => {
              itemKM += `
              <div class="itemkm" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}">
                  <a href="javascript:void(0);">
                      <img src="${item.image}">
                  </a>
              </div>
              `;
          });

          ct_Khuyen_Mai.innerHTML = itemKM;

          // Lấy tất cả item và gán sự kiện click
          document.querySelectorAll(".itemkm").forEach(item => {
              item.addEventListener("click", function () {
                  document.getElementById("promoTitle").textContent = this.getAttribute("data-title");
                  document.getElementById("promoDescription").textContent = this.getAttribute("data-description");

                  // Hiển thị modal
                  document.getElementById("promotionModal").style.display = "block";
                  document.getElementById("modalBackdrop").style.display = "block";
              });
          });

          // Đóng modal khi nhấn vào backdrop hoặc nút đóng
          document.getElementById("closeModal").addEventListener("click", () => {
              document.getElementById("promotionModal").style.display = "none";
              document.getElementById("modalBackdrop").style.display = "none";
          });

          document.getElementById("modalBackdrop").addEventListener("click", () => {
              document.getElementById("promotionModal").style.display = "none";
              document.getElementById("modalBackdrop").style.display = "none";
          });
      } else {
          ct_Khuyen_Mai.innerHTML = `<p>Không có khuyến mại nào.</p>`;
      }
  } catch (error) {
      console.error("Lỗi khi tải dữ liệu khuyến mãi:", error);
  }
});