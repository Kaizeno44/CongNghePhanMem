function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener("DOMContentLoaded", function () {
    // Sử dụng csrf token từ template nếu có
    const csrfToken = document.querySelector('script').textContent.trim() || getCookie("csrftoken");

    // Chọn tất cả các nút đổi quà
    document.querySelectorAll(".btn-redeem").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const strongElement = document.querySelectorAll(".thongtin1 strong")[index];
            if (!strongElement) {
                console.error("Không tìm thấy thông tin quà tặng!");
                return;
            }

            const giftId = strongElement.dataset.giftId; // ID sản phẩm
            const pointsRequired = parseInt(strongElement.textContent);

            if (!giftId) {
                console.error("Không thể tìm thấy gift ID!");
                return;
            }

            // Gửi request đổi quà
            fetch('/redeem-gift/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken, // Sử dụng csrf token
                },
                body: JSON.stringify({
                    gift_id: giftId,
                    points_required: pointsRequired,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.message) {
                        alert(data.message);
                    }
                    if (data.remaining_points !== undefined) {
                        document.getElementById("current-points").textContent = data.remaining_points;
                    }

                    // Vô hiệu hóa nút nếu điểm không đủ
                    if (data.remaining_points < pointsRequired) {
                        btn.disabled = true;
                    }
                })
                .catch((error) => console.error("Error:", error));
        });
    });
});
