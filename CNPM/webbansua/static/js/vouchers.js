document.addEventListener("DOMContentLoaded", function () {
    const voucherContainer = document.getElementById("voucher-container");
    const rawData = voucherContainer.dataset.vouchers;

    console.log("Raw vouchers data:", rawData); // Kiểm tra JSON từ server

    try {
        const vouchers = JSON.parse(rawData); // Parse dữ liệu JSON
        console.log("Parsed vouchers:", vouchers); // Kiểm tra dữ liệu sau khi parse

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
