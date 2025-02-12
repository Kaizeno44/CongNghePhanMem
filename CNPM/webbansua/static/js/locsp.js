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
