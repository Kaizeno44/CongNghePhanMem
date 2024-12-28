
    document.getElementById('add-order-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const customer = document.getElementById('customer').value;
        const date = document.getElementById('date').value;
        const status = document.getElementById('status').value;
        const total = document.getElementById('total').value;

        alert(`Đơn hàng đã được thêm:\n\nKhách hàng: ${customer}\nNgày đặt: ${date}\nTrạng thái: ${status}\nTổng tiền: ${total} VNĐ`);

        // Clear form after submission
        this.reset();
    });
