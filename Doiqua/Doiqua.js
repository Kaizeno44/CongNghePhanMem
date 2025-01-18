document.addEventListener("DOMContentLoaded", function () {
    // Lấy số điểm từ localStorage
    function getPoints() {
        return parseInt(localStorage.getItem("userPoints")) || 0; // Trả về 0 nếu không có dữ liệu
    }

    // Hiển thị số điểm trên giao diện
    function displayPoints() {
        const pointsElement = document.getElementById("current-points");
        if (pointsElement) {
            pointsElement.textContent = getPoints(); // Hiển thị điểm từ localStorage
        }
    }

    // Đổi quà và cập nhật điểm
    function redeemGift(pointsRequired) {
        let userPoints = getPoints();
        if (userPoints >= pointsRequired) {
            userPoints -= pointsRequired;
            localStorage.setItem("userPoints", userPoints); // Cập nhật điểm sau khi đổi quà
            alert(`Đổi quà thành công! Điểm còn lại: ${userPoints}`);
            displayPoints(); // Cập nhật lại giao diện
        } else {
            alert("Bạn không đủ điểm để đổi quà.");
        }
    }

    // Gán sự kiện cho nút "Đổi quà"
    document.querySelectorAll(".thongtin2 span").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const pointsRequired = parseInt(
                document.querySelectorAll(".thongtin1 strong")[index].textContent
            );
            redeemGift(pointsRequired);
        });
    });

    // Hiển thị điểm khi tải trang
    displayPoints();
});
