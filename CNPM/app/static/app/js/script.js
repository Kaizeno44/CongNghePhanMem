document.addEventListener("DOMContentLoaded", () => {
    // Lấy container
    const container = document.getElementById('container');
    const handeSignUp = () => {
        if (container) {
            container.classList.add("active");
        } else {
            console.error("Phần tử container không tồn tại!");
        }
    };
    const handeSignIn = () => {
        if (container) {
            container.classList.remove("active");
        } else {
            console.error("Phần tử container không tồn tại!");
        }
    };

    // Gắn sự kiện click cho các nút
    const registerButton = document.getElementById('register');
    const loginButton = document.getElementById('login');

    if (registerButton) {
        registerButton.addEventListener('click', handeSignUp);
    } else {
        console.error("Nút 'Đăng Kí' không tồn tại!");
    }

    if (loginButton) {
        loginButton.addEventListener('click', handeSignIn);
    } else {
        console.error("Nút 'Đăng Nhập' không tồn tại!");
    }
});
