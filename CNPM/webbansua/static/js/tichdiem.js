document.addEventListener("DOMContentLoaded", function () {
    // Tích điểm và lưu vào localStorage
    function addPoints() {
        const phoneInput = document.querySelector("input[type='tel']").value;
        if (phoneInput.length === 10) {
            let userPoints = parseInt(localStorage.getItem("userPoints")) || 0; // Lấy điểm hiện tại
            userPoints += 100; // Thêm 100 điểm
            localStorage.setItem("userPoints", userPoints); // Lưu vào localStorage
            alert(`Tích điểm thành công! Điểm hiện tại: ${userPoints}`);
        } else {
            alert("Vui lòng nhập đúng số điện thoại (10 số).");
        }
    }

    // Gán sự kiện cho nút xác nhận
    document.querySelector("button").addEventListener("click", addPoints);
});
