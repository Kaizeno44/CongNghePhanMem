document.addEventListener('DOMContentLoaded', async () => {
  const promotionsContainer = document.querySelector('.listItemKm');
  const apiEndpoint = '/api/promotions'; // Thay đổi đường dẫn này với API thực tế
  
  try {
    // Fetch data từ API
    const response = await fetch(apiEndpoint);
    const promotions = await response.json();

    // Kết xuất danh sách khuyến mãi
    promotions.forEach(promotion => {
      const promoItem = document.createElement('div');
      promoItem.className = 'itemkm';
      promoItem.dataset.id = promotion.id;
      promoItem.textContent = promotion.title;

      // Gắn sự kiện click động
      promoItem.addEventListener('click', () => {
        showModal(promotion.details);
      });

      promotionsContainer.appendChild(promoItem);
    });
  } catch (error) {
    console.error('Error fetching promotions:', error);
  }

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


// Backend cần cung cấp API trả về danh sách các chương trình khuyến mãi.->
// URL: /api/promotions
// HTTP Method: GET
// Response: JSON ví dụ. [
//  {
//    "id": "1",
//    "title": "Quà Xinh Cho Khách Mới, Quà Xịn Cho Khách Quen",
//    "details": "<h2>Quà Xinh Cho Khách Mới...</h2><p>Thời gian áp dụng...</p>"
//  },
//  {
//    "id": "2",
//    "title": "Trung Thu Rộn Ràng Quà Tặng Ngập Tràn",
//   "details": "<h2>Trung Thu Rộn Ràng...</h2><p>Thời gian áp dụng...</p>"
//  }
//]
