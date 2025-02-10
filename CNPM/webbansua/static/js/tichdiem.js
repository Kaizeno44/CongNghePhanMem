document.addEventListener("DOMContentLoaded", function () {
    // Tích điểm và gửi yêu cầu đến backend
    async function addPoints() {
        const phoneInput = document.querySelector("input[type='tel']").value;

        // Kiểm tra số điện thoại có đúng định dạng không
        if (phoneInput.length !== 10 || isNaN(phoneInput)) {
            alert("Vui lòng nhập đúng số điện thoại (10 số).");
            return;
        }

        try {
            // Gửi yêu cầu POST đến backend
            const response = await fetch("/api/Earnpoints/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone: phoneInput }),
            });

            // Xử lý phản hồi từ backend
            const result = await response.json();
            if (response.status === 200) {
                alert(`Tích điểm thành công! Điểm hiện tại: ${result.current_points}`);
            } else {
                alert(result.message || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            alert("Không thể kết nối đến máy chủ, vui lòng thử lại sau.");
        }
    }

    // Gán sự kiện cho nút xác nhận
    document.querySelector("button").addEventListener("click", addPoints);
});
