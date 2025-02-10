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

const redeemGiftUrl = '/redeem-gift/';

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".thongtin2 button").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const giftId = document.querySelectorAll(".thongtin1 strong")[index].dataset.giftId; // ID sản phẩm
            const pointsRequired = parseInt(
                document.querySelectorAll(".thongtin1 strong")[index].textContent
            );

            fetch(redeemGiftUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"), // CSRF token
                },
                body: JSON.stringify({
                    gift_id: giftId,
                    points_required: pointsRequired,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        alert(data.message);
                    }
                    if (data.remaining_points !== undefined) {
                        document.getElementById("current-points").textContent = data.remaining_points;
                    }
                })
                .catch((error) => console.error("Error:", error));
        });
    });
});

