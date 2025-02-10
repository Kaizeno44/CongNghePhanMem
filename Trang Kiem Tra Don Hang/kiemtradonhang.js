function checkOrder() {
    let query = document.getElementById("orderInput").value.trim();
    if (!query) {
        alert("Vui lòng nhập số điện thoại hoặc email!");
        return;
    }

    fetch(`/api/check_order/?query=${query}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }

        let details = "<ul>";
        data.orders.forEach(order => {
            details += `<li>Đơn hàng #${order.id} - ${order.customer}</li>
                        <li>📞 SĐT: ${order.phone_number}</li>
                        <li>📦 Trạng thái: ${order.status}</li>
                        <li>📅 Ngày tạo: ${order.created_at}</li>
                        <li>💰 Tổng tiền: ${order.total_price} VNĐ</li>
                        <li>👤 Họ và tên: ${order.full_name}</li>
                        <li>🏡 Địa chỉ: ${order.address}</li>
                        <li>🎟️ Voucher: ${order.voucher}</li>
                        <li>📝 Ghi chú: ${order.notes}</li><hr>`;
        });
        details += "</ul>";

        document.getElementById("orderDetails").innerHTML = details;
        document.getElementById("orderModal").style.display = "block";
    })
    .catch(error => console.error("Error:", error));
}