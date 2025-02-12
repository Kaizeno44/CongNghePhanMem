// Hiern thi thong tin khach hang
window.addEventListener("load", async () => {
    try {
        const response = await fetch("/api/currentuser/");
        const user = await response.json();
        const proFile = document.getElementById("proFile");
        const phoneNumber = user.phone_number ? user.phone_number : "";
        if (user) {
            proFile.innerHTML = `
                <div class="info">
                    <div><span>Tên đăng nhập:</span> ${user.username}</div>
                    <div><span>Số điện thoại:</span> ${phoneNumber}</div>
                    <div><span>Điểm:</span> ${user.points} <i class="fa fa-star" aria-hidden="true"></i></div>
                </div>`;
        } else {
            proFile.innerHTML = `<p>Không tìm thấy thông tin tài khoản.</p>`;
        }
    } catch (error) {
        document.getElementById("proFile").innerHTML = `<p>Có lỗi xảy ra, vui lòng thử lại.</p>`;
    }
});
