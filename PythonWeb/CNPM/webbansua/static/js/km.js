// hien thi khuyen mai
window.addEventListener("load", async () => {
    try {
      const response = await fetch("/api/promotion/");
      const dataKM = await response.json();
      const ct_Khuyen_Mai = document.getElementById("ct_Khuyen_Mai");
      let itemKM = "";
      if (dataKM.length > 0) {
          dataKM.forEach((item) => {
            itemKM += `
            <div class="itemkm" >
                <a href="#">
                    <img src="${item.image}">
                </a>
            </div>
            `
          });
          ct_Khuyen_Mai.innerHTML = itemKM || `<p>Không có khuyến mại nào.</p>`
      }    
    } catch (error) {
      
    }
  });
  