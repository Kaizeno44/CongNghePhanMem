document.addEventListener("DOMContentLoaded", () => {
    const menuTitles = document.querySelectorAll(".menu-title");

    menuTitles.forEach((title) => {
        title.addEventListener("click", () => {
            const submenu = title.nextElementSibling;
            const arrow = title.querySelector(".arrow");

            // Toggle hiển thị submenu
            if (submenu.style.display === "block") {
                submenu.style.display = "none"; // Ẩn submenu
                arrow.style.transform = "rotate(0deg)"; // Xoay mũi tên lên
                title.classList.remove("active"); // Loại bỏ màu khi đóng
            } else {
                submenu.style.display = "block"; // Hiện submenu
                arrow.style.transform = "rotate(180deg)"; // Xoay mũi tên xuống
                title.classList.add("active"); // Thêm màu khi mở
            }
        });
    });
});
