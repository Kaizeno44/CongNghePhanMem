document.addEventListener("DOMContentLoaded", function () {
    const voucherContainer = document.getElementById("voucher-container");
    const rawData = voucherContainer.dataset.vouchers;

    console.log("Raw vouchers data:", rawData); // Kiểm tra JSON từ server

    try {
        const vouchers = JSON.parse(rawData); // Parse dữ liệu JSON
        console.log("Parsed vouchers:", vouchers); // Kiểm tra dữ liệu sau khi parse

        // Render danh sách voucher
        vouchers.forEach(voucher => {
            const voucherHTML = `
                <div class="itemvoucher">
                    <div class="voucher_header">
                        <span>${voucher.discount_value ? `${parseFloat(voucher.discount_value).toLocaleString()}đ` : `${voucher.discount_percent}%`}</span>
                        <div class="thongtin">
                            <p>Cho đơn hàng online từ</p>
                            <p>${parseFloat(voucher.minimum_order_value || 0).toLocaleString()}k</p>
                        </div>
                    </div>
                    <div class="voucher_footer">
                        <p>${voucher.brand || "Không rõ thương hiệu"}</p>
                        <span style="color: #ae0258; font-size: 11px;">Mã dành cho ${voucher.description || "Không có mô tả"}</span>
                        <div class="tile1">
                            <span style="color: #ae0258; font-size: 11px;">Đến ngày ${voucher.expiration_date}</span>
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
