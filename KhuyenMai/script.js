////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Nút Subscribe
document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.querySelector('.form-container button');
    const emailInput = document.querySelector('.form-container input');

    subscribeButton.addEventListener('click', () => {
        const email = emailInput.value;
        if (email) {
            showNotification('Bạn đã đăng ký thành công!');
            emailInput.value = ''; // Reset trường nhập
        } else {
            showNotification('Vui lòng nhập email!', 'error');
        }
    });

    function showNotification(message, type = 'success') {
        // Tạo thông báo
        const notification = document.createElement('div');
        notification.className = `notification ${type === 'error' ? 'error' : ''}`;
        notification.textContent = message;

        // Thêm thông báo vào body
        document.body.appendChild(notification);

        // Hiển thị thông báo
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Ẩn và xóa thông báo sau 3 giây
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Khuyến mãi từ sữa Danmilko
document.addEventListener('DOMContentLoaded', () => {
    // Thêm sự kiện cho mục "Khuyến mãi từ sữa Danmilko"
    const danmilkoItem = document.querySelector('.listItemKm .itemkm:first-child');
    danmilkoItem.addEventListener('click', () => {
        showModal(`
            <h2>Quà Xinh Cho Khách Mới, Quà Xịn Cho Khách Quen</h2>
            <p><strong>Thời gian áp dụng:</strong> Từ ngày 01/01/2024 đến ngày 31/03/2024.</p>
            <p><strong>Đối tượng:</strong></p>
            <ul>
                <li><strong>Khách hàng mới:</strong> Lần đầu mua các sản phẩm của thương hiệu.</li>
                <li><strong>Khách hàng quen:</strong> Đã mua hàng từ 2 lần trở lên trước đó.</li>
            </ul>
            <p><strong>Nội dung chương trình:</strong></p>
            <p><strong>Dành cho khách hàng mới:</strong></p>
            <ul>
                <li>Khi đăng ký tài khoản mua sắm trên website hoặc tại cửa hàng, nhận ngay một túi vải thân thiện với môi trường in logo thương hiệu.</li>
                <li>Mua sản phẩm đầu tiên từ 500.000 VNĐ trở lên được tặng thêm một hộp sữa đặc biệt dung tích 1L.</li>
            </ul>
            <p><strong>Dành cho khách hàng quen:</strong></p>
            <ul>
                <li>Khi mua hàng từ 1 triệu VNĐ trở lên, khách hàng sẽ nhận ngay một voucher giảm giá 10% cho lần mua tiếp theo.</li>
                <li>Nếu mua sản phẩm với tổng giá trị trên 2 triệu VNĐ, khách hàng được tặng thêm một bộ cốc sứ cao cấp với họa tiết độc quyền của thương hiệu.</li>
            </ul>
            <p><strong>Thể lệ chương trình:</strong></p>
            <ul>
                <li>Áp dụng trên toàn quốc tại các cửa hàng chính hãng, website và ứng dụng di động.</li>
                <li>Quà tặng không quy đổi thành tiền mặt và không áp dụng đồng thời với các chương trình khuyến mãi khác.</li>
                <li>Mỗi khách hàng chỉ được tham gia tối đa 2 lần trong thời gian khuyến mãi.</li>
            </ul>
            <p><strong>Cách thức tham gia:</strong></p>
            <ul>
                <li>Đăng ký tài khoản trên website <a href="http://www.suathuonghieu.vn" target="_blank">www.suathuonghieu.vn</a> hoặc mua trực tiếp tại các cửa hàng.</li>
                <li>Gửi hóa đơn mua hàng đến tổng đài chăm sóc khách hàng để xác nhận quà tặng.</li>
            </ul>
        `);
    });

    function showModal(content) {
        // Tạo backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        document.body.appendChild(backdrop);

        // Tạo modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <button class="close">&times;</button>
            <div>${content}</div>
        `;
        document.body.appendChild(modal);

        // Hiển thị modal và backdrop
        backdrop.style.display = 'block';
        modal.style.display = 'block';

        // Thêm sự kiện đóng modal
        modal.querySelector('.close').addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        function closeModal() {
            modal.remove();
            backdrop.remove();
        }
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Trung thu rộn ràng quá tặng ngập tràn
document.addEventListener('DOMContentLoaded', () => {
    // Thêm sự kiện cho mục "Trung thu rộn ràng quá tặng ngập tràn"
    const trungThuItem = document.querySelector('.listItemKm .itemkm:nth-child(2)'); // Đảm bảo chọn đúng phần tử
    trungThuItem.addEventListener('click', () => {
        showModal(`
            <h2>Trung Thu Rộn Ràng Quà Tặng Ngập Tràn</h2>
            <p><strong>Thời gian khuyến mãi:</strong> Từ 13/08/2024 đến 15/10/2024. Chương trình sẽ kết thúc khi hết quà, vì vậy ba mẹ hãy nhanh tay nhé!</p>
            <p><strong>Sản phẩm áp dụng:</strong> Các sản phẩm sữa Hikid.</p>
            <p><strong>Quà tặng:</strong> Khi mua sữa Hikid trong thời gian khuyến mãi, khách hàng sẽ nhận được quà tặng hấp dẫn.</p>
            <p><strong>Lưu ý:</strong> Số lượng quà tặng có hạn và có thể hết trước khi kết thúc chương trình.</p>
            <p>Để biết thêm chi tiết và cập nhật thông tin mới nhất về các chương trình khuyến mãi, bạn nên truy cập trang web chính thức của thương hiệu sữa hoặc liên hệ trực tiếp với nhà phân phối.</p>
        `);
    });

    function showModal(content) {
        // Tạo backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        document.body.appendChild(backdrop);

        // Tạo modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <button class="close">&times;</button>
            <div>${content}</div>
        `;
        document.body.appendChild(modal);

        // Hiển thị modal và backdrop
        backdrop.style.display = 'block';
        modal.style.display = 'block';

        // Thêm sự kiện đóng modal
        modal.querySelector('.close').addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        function closeModal() {
            modal.remove();
            backdrop.remove();
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Uống sữa tốt, đổi quà xịn
document.addEventListener('DOMContentLoaded', () => {
    // Thêm sự kiện cho mục "Uống sữa tốt, đổi quà xịn"
    const uongSuaItem = document.querySelector('.listItemKm .itemkm:nth-child(3)'); // Đảm bảo chọn đúng phần tử
    uongSuaItem.addEventListener('click', () => {
        showModal(`
            <h2>Uống Sữa Tốt, Đổi Quà Xịn</h2>
            <p><strong>Thời gian áp dụng:</strong> Từ ngày 1 tháng 12, 2024 đến hết ngày 31 tháng 1, 2025.</p>
            <p><strong>Sản phẩm áp dụng:</strong></p>
            <ul>
                <li>Các sản phẩm sữa tươi, sữa bột, và sữa chua uống của thương hiệu Delimax (ví dụ: Sữa tươi Delimax 1L, Sữa bột dinh dưỡng Delimax 800g, Sữa chua uống Delimax 180ml).</li>
            </ul>
            <p><strong>Cách thức tham gia:</strong></p>
            <ul>
                <li>Mua bất kỳ sản phẩm sữa nào của Delimax trong thời gian khuyến mãi.</li>
                <li>Lưu lại mã QR hoặc mã số từ hóa đơn mua hàng hoặc mã code in trên bao bì sản phẩm.</li>
                <li>Đăng nhập vào website hoặc ứng dụng khuyến mãi của Delimax.</li>
                <li>Nhập mã số và tham gia trò chơi may mắn hoặc quay số để nhận quà.</li>
            </ul>
            <p><strong>Quà tặng:</strong></p>
            <ul>
                <li><strong>Giải đặc biệt:</strong> Một chiếc xe đạp thể thao trị giá 5 triệu VNĐ (dành cho khách hàng may mắn nhất).</li>
                <li><strong>Giải nhì:</strong> Một bộ sản phẩm chăm sóc sức khỏe trị giá 1 triệu VNĐ.</li>
                <li><strong>Giải ba:</strong> Một chiếc máy xay sinh tố cao cấp trị giá 500.000 VNĐ.</li>
                <li><strong>Quà tặng kèm:</strong> Bộ dụng cụ thể thao (bao gồm bình nước, khăn tập gym, giày thể thao) cho những khách hàng tham gia chương trình.</li>
            </ul>
            <p><strong>Lưu ý:</strong></p>
            <ul>
                <li>Chương trình có thể kết thúc sớm nếu hết quà tặng.</li>
                <li>Quà tặng không thể quy đổi thành tiền mặt.</li>
                <li>Mỗi mã số chỉ sử dụng được một lần và không áp dụng đồng thời với các chương trình khuyến mãi khác.</li>
            </ul>
        `);
    });

    function showModal(content) {
        // Tạo backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        document.body.appendChild(backdrop);

        // Tạo modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <button class="close">&times;</button>
            <div>${content}</div>
        `;
        document.body.appendChild(modal);

        // Hiển thị modal và backdrop
        backdrop.style.display = 'block';
        modal.style.display = 'block';

        // Thêm sự kiện đóng modal
        modal.querySelector('.close').addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        function closeModal() {
            modal.remove();
            backdrop.remove();
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Uống sữa tốt , Nhận quà hay từ sữa Neocare
document.addEventListener('DOMContentLoaded', () => {
    // Thêm sự kiện cho mục "Uống Sữa Tốt, Nhận Quà Hay Từ Sữa Neocare"
    const uongSuaNeocareItem = document.querySelector('.listItemKm .itemkm:nth-child(4)'); // Đảm bảo chọn đúng phần tử
    uongSuaNeocareItem.addEventListener('click', () => {
        showModal(`
            <h2>Uống Sữa Tốt, Nhận Quà Hay Từ Sữa Neocare</h2>
            <p><strong>Thời gian chương trình:</strong> Từ ngày 01/12/2024 đến 31/12/2024</p>
            <p><strong>Đối tượng tham gia:</strong> Tất cả khách hàng mua sữa Neocare trong thời gian chương trình.</p>
            <p><strong>Cách tham gia:</strong></p>
            <ul>
                <li>Mua bất kỳ sản phẩm sữa Neocare nào (từ các cửa hàng, siêu thị, hoặc mua online).</li>
                <li>Lưu lại hóa đơn mua hàng hoặc mã số sản phẩm trên bao bì.</li>
                <li>Truy cập vào trang web hoặc fanpage của Neocare và đăng ký tham gia chương trình bằng cách điền thông tin cá nhân và nhập mã số sản phẩm hoặc tải lên ảnh chụp hóa đơn.</li>
            </ul>
            <p><strong>Giải thưởng hấp dẫn:</strong></p>
            <ul>
                <li><strong>Giải Nhất:</strong> 1 xe máy trị giá 30 triệu đồng.</li>
                <li><strong>Giải Nhì:</strong> 10 điện thoại thông minh cao cấp.</li>
                <li><strong>Giải Ba:</strong> 100 bộ quà tặng sữa Neocare trị giá 500.000 đồng.</li>
                <li><strong>Giải Khuyến Khích:</strong> 500 voucher giảm giá 10% cho lần mua sữa tiếp theo.</li>
            </ul>
            <p><strong>Điều kiện và thể lệ:</strong></p>
            <ul>
                <li>Chương trình áp dụng cho khách hàng từ 18 tuổi trở lên.</li>
                <li>Mỗi hóa đơn chỉ được tham gia 1 lần.</li>
                <li>Giải thưởng không có giá trị quy đổi thành tiền mặt.</li>
                <li>Lễ trao giải sẽ được tổ chức vào ngày 15/01/2025, và người chiến thắng sẽ được thông báo qua email hoặc điện thoại.</li>
            </ul>
            <p><strong>Lưu ý:</strong></p>
            <ul>
                <li>Sữa Neocare là sản phẩm cung cấp dưỡng chất tuyệt vời cho sức khỏe, phù hợp với mọi lứa tuổi và nhu cầu dinh dưỡng.</li>
                <li>Hãy chia sẻ câu chuyện về việc uống sữa Neocare của bạn trên mạng xã hội để nhận thêm phần quà hấp dẫn từ chương trình!</li>
            </ul>
        `);
    });

    function showModal(content) {
        // Tạo backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        document.body.appendChild(backdrop);

        // Tạo modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <button class="close">&times;</button>
            <div>${content}</div>
        `;
        document.body.appendChild(modal);

        // Hiển thị modal và backdrop
        backdrop.style.display = 'block';
        modal.style.display = 'block';

        // Thêm sự kiện đóng modal
        modal.querySelector('.close').addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        function closeModal() {
            modal.remove();
            backdrop.remove();
        }
    }
});
