document.addEventListener("DOMContentLoaded", () => {
    const menuTitles = document.querySelectorAll(".menu-title");

    menuTitles.forEach((title) => {
        const submenu = title.nextElementSibling; // Menu con
        const arrow = title.querySelector(".arrow");

        // Sự kiện click để toggle menu con
        title.addEventListener("click", () => {
            const isOpen = submenu.style.display === "block";

            // Ẩn hoặc hiển thị menu con
            submenu.style.display = isOpen ? "none" : "block";

            // Xoay mũi tên
            arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
        });

        // Sự kiện hover để hiển thị menu con
        title.addEventListener("mouseenter", () => {
            submenu.style.display = "block";
            arrow.style.transform = "rotate(180deg)";
        });

        // Ẩn menu con khi rời khỏi vùng menu
        title.parentElement.addEventListener("mouseleave", () => {
            submenu.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        });
    });
});
