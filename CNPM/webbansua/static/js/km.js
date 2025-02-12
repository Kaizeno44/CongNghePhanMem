window.addEventListener("load", async () => {
  try {
      const response = await fetch("/api/promotion/");
      const dataKM = await response.json();
      const ct_Khuyen_Mai = document.getElementById("ct_Khuyen_Mai");
      let itemKM = "";

      if (dataKM.length > 0) {
          dataKM.forEach((item) => {
              itemKM += `
              <div class="itemkm" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}">
                  <a href="javascript:void(0);">
                      <img src="${item.image}">
                  </a>
              </div>
              `;
          });

          ct_Khuyen_Mai.innerHTML = itemKM;

          // Lấy tất cả item và gán sự kiện click
          document.querySelectorAll(".itemkm").forEach(item => {
              item.addEventListener("click", function () {
                  document.getElementById("promoTitle").textContent = this.getAttribute("data-title");
                  document.getElementById("promoDescription").textContent = this.getAttribute("data-description");

                  // Hiển thị modal
                  document.getElementById("promotionModal").style.display = "block";
                  document.getElementById("modalBackdrop").style.display = "block";
              });
          });

          // Đóng modal khi nhấn vào backdrop hoặc nút đóng
          document.getElementById("closeModal").addEventListener("click", () => {
              document.getElementById("promotionModal").style.display = "none";
              document.getElementById("modalBackdrop").style.display = "none";
          });

          document.getElementById("modalBackdrop").addEventListener("click", () => {
              document.getElementById("promotionModal").style.display = "none";
              document.getElementById("modalBackdrop").style.display = "none";
          });
      } else {
          ct_Khuyen_Mai.innerHTML = `<p>Không có khuyến mại nào.</p>`;
      }
  } catch (error) {
      console.error("Lỗi khi tải dữ liệu khuyến mãi:", error);
  }
});