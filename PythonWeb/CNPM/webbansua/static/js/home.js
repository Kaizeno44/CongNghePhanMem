// Khi quay laị update giỏ hàng
window.addEventListener("pageshow", async () => {
  await updateUserCartData();
});
const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];
  return csrfToken || "";
};
// Lay sp hien thi trong giao dien
window.addEventListener("load", async () => {
  const formatCurrency = (amount) => {
    if (!amount) return "";
    return parseFloat(amount).toLocaleString("vi-VN") + "đ";
  };
  try {
    const response = await fetch("/api/products/");
    const data = await response.json();
    const products_fashsale = document.getElementById("products_fashsale");
    const products_banchay = document.getElementById("products_banchay");
    const products_ban = document.getElementById("products_ban");

    if (data.length > 0) {
      const flashsaleProducts = data
        .filter(product => product.category === "hang_khuyen_mai" && product.status === "con_hang")
        .slice(0, 5);
      const banchayProducts = data
        .filter(product => product.category === "hang_ban_chay" && product.status === "con_hang")
        .slice(0, 5);
      const spSuaBot = data
        .filter(product => product.category === "sua_bot_dinh_duong" && product.status === "con_hang");
      const firstRowProducts = spSuaBot.slice(0, 5);
      const secondRowProducts = spSuaBot.slice(5, 10);
      let flashsaleHTML = "";
      let banchayHTML = "";
      let spBanHTML_Hang1 = "";
      let spBanHTML_Hang2 = "";
      flashsaleProducts.forEach(product => {
        let giamPhanTram = "";
        if (product.sale_price && product.price && product.sale_price > product.price) {
          const giam = Math.round(((product.sale_price - product.price) / product.sale_price) * 100);
          giamPhanTram = `- ${giam}%`;
        }
        flashsaleHTML += `
              <div class="item_products">
                  <div class="inside-flas isspbc" style="position: relative;">
                      ${giamPhanTram ? `<div class="home-sua-percent"><span>${giamPhanTram}</span></div>` : ""}
                      <a style="text-decoration: none;" href="/Orderdetails/${product.id}/">
                          <div class="flashsale-pic"><img src="${product.image_url}" alt="${product.name}"></div>
                          <div class="flashsale-title">${product.name}</div>
                      </a>
                      <div>
                          <div class="title_gia" style="display: flex; margin-bottom: 5px;">
                              <div class="col-md-6 paddL0"><div class="sales-price">${formatCurrency(product.price)}</div></div>
                              <div class="col-md-6"><div class="sales-root">${product.sale_price ? formatCurrency(product.sale_price) : ""}</div></div>
                          </div>
                          <div class="chonmua_buy_fast"><a onclick="handleBuy(${product.id})">Chọn mua</a></div>
                      </div>
                  </div>
              </div>`;
      });
      banchayProducts.forEach(product => {
        let giamPhanTram = "";
        if (product.sale_price && product.price && product.sale_price > product.price) {
          const giam = Math.round(((product.sale_price - product.price) / product.sale_price) * 100);
          giamPhanTram = `- ${giam}%`;
        }
        banchayHTML += `
              <div class="item_products">
                  <div class="inside-flas isspbc" style="position: relative;">
                      ${giamPhanTram ? `<div class="home-sua-percent"><span>${giamPhanTram}</span></div>` : ""}
                      <a style="text-decoration: none;" href="/Orderdetails/${product.id}/">
                          <div class="flashsale-pic"><img src="${product.image_url}" alt="${product.name}"></div>
                          <div class="flashsale-title">${product.name}</div>
                      </a>
                      <div>
                          <div class="title_gia" style="display: flex; margin-bottom: 5px;">
                              <div class="col-md-6 paddL0"><div class="sales-price">${formatCurrency(product.price)}</div></div>
                              <div class="col-md-6"><div class="sales-root">${product.sale_price ? formatCurrency(product.sale_price) : ""}</div></div>
                          </div>
                          <div class="chonmua_buy_fast"><a onclick="handleBuy(${product.id})">Chọn mua</a></div>
                      </div>
                  </div>
              </div>`;
      });
      firstRowProducts.forEach(product => {
        let giamPhanTram = "";
        if (product.sale_price && product.price && product.sale_price > product.price) {
          const giam = Math.round(((product.sale_price - product.price) / product.sale_price) * 100);
          giamPhanTram = `- ${giam}%`;
        }
        spBanHTML_Hang1 += `
            <div class="item_products">
                <div class="inside-flas isspbc" style="position: relative;">
                    ${giamPhanTram ? `<div class="home-sua-percent"><span>${giamPhanTram}</span></div>` : ""}
                    <a style="text-decoration: none;" href="/Orderdetails/${product.id}/">
                        <div class="flashsale-pic"><img src="${product.image_url}" alt="${product.name}"></div>
                        <div class="flashsale-title">${product.name}</div>
                    </a>
                    <div>
                        <div class="title_gia" style="display: flex; margin-bottom: 5px;">
                            <div class="col-md-6 paddL0"><div class="sales-price">${formatCurrency(product.price)}</div></div>
                            <div class="col-md-6"><div class="sales-root">${product.sale_price ? formatCurrency(product.sale_price) : ""}</div></div>
                        </div>
                        <div class="chonmua_buy_fast"><a onclick="handleBuy(${product.id})">Chọn mua</a></div>
                    </div>
                </div>
            </div>`;
      });
      secondRowProducts.forEach(product => {
        let giamPhanTram = "";
        if (product.sale_price && product.price && product.sale_price > product.price) {
          const giam = Math.round(((product.sale_price - product.price) / product.sale_price) * 100);
          giamPhanTram = `- ${giam}%`;
        }
        spBanHTML_Hang2 += `
            <div class="item_products">
                <div class="inside-flas isspbc" style="position: relative;">
                    ${giamPhanTram ? `<div class="home-sua-percent"><span>${giamPhanTram}</span></div>` : ""}
                    <a style="text-decoration: none;" href="/Orderdetails/${product.id}/">
                        <div class="flashsale-pic"><img src="${product.image_url}" alt="${product.name}"></div>
                        <div class="flashsale-title">${product.name}</div>
                    </a>
                    <div>
                        <div class="title_gia" style="display: flex; margin-bottom: 5px;">
                            <div class="col-md-6 paddL0"><div class="sales-price">${formatCurrency(product.price)}</div></div>
                            <div class="col-md-6"><div class="sales-root">${product.sale_price ? formatCurrency(product.sale_price) : ""}</div></div>
                        </div>
                        <div class="chonmua_buy_fast"><a onclick="handleBuy(${product.id})">Chọn mua</a></div>
                    </div>
                </div>
            </div>`;
      });
      products_fashsale.innerHTML = flashsaleHTML || `<p>Không có sản phẩm khuyến mãi.</p>`;
      products_banchay.innerHTML = banchayHTML || `<p>Không có sản phẩm bán chạy.</p>`;
      products_ban.innerHTML = `
        <div class="container_list_sp_ban">
        <div class="row">${spBanHTML_Hang1}</div>
        <div class="row">${spBanHTML_Hang2}</div>
        </div>
      `  || `<p>Không có sản phẩm.</p>`;
    }
    else {
      products_fashsale.innerHTML = `<p>Không có sản phẩm khuyến mãi.</p>`;
      products_banchay.innerHTML = `<p>Không có sản phẩm bán chạy.</p>`;
      products_ban.innerHTML = `<p>Không có sản phẩm bán.</p>`

    }
  } catch (error) {
    console.error("Không có dữ liệu hoặc lỗi xảy ra:", error);
  }
});
// Hien thi khuyen mai
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
// Su kien khi an chon mua
const handleBuy = async (productId) => {
  try {
    const loginStatusResponse = await fetch("/api/check_login/");
    const loginStatus = await loginStatusResponse.json();
    if (!loginStatus.logged_in) {
      toast({
        title: "Warning",
        message: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!",
        type: "warning",
        duration: 3000,
      });
      return;
    }
    else {
      const productResponse = await fetch("/api/products/");
      const products = await productResponse.json();
      const product = products.find((item) => item.id === productId);
      const cartItemData = {
        product: product.name,
        quantity: 1,
      };
      const csrfToken = getCSRFToken();
      const response = await fetch("/api/cartitem/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(cartItemData),
      });
      const updatedCartData = await fetch("/api/cartitem/");
      const updatedCartItems = await updatedCartData.json();
      updateUserCartData(updatedCartItems);
      toast({
        title: "Success",
        message: "Đã thêm vào giỏ hàng",
        type: "success",
        duration: 3000,
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      message: error.message || "Đã xảy ra lỗi, vui lòng thử lại!",
      type: "error",
      duration: 3000,
    });
  }
};
// Update quantity gio hang
const updateUserCartData = async () => {
  try {
    const loginStatusResponse = await fetch("/api/check_login/");
    const loginStatus = await loginStatusResponse.json();
    if (loginStatus.logged_in) {
      const response = await fetch("/api/user-cart/");
      const cartItems = await response.json();

      const cartCounter = document.getElementById("valueGioHang");
      const totalQuantity = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
      cartCounter.textContent = totalQuantity;
    }
  } catch (error) {
    toast({
      title: "Lỗi",
      message: error.message,
      type: "error",
      duration: 3000,
    });
  }
};
// Tim kiem san pham
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  const searchSuggestions = document.getElementById("search-suggestions");
  searchBox.addEventListener("input", async () => {
      const query = searchBox.value.trim();
      if (!query) {
          searchSuggestions.innerHTML = "";
          searchSuggestions.style.display = "none";
          return;
      }
      try {
          const response = await fetch(`/api/search/?q=${encodeURIComponent(query)}`);
          const products = await response.json();
          if (products.length === 0) {
              searchSuggestions.innerHTML = "<div>Không tìm thấy sản phẩm</div>";
          } else {
              searchSuggestions.innerHTML = products
                  .map(product => `
                      <div onclick="redirectToProduct(${product.id})">
                          <img src="${product.image_url}" alt="${product.name}" style="width: 50px; margin-right: 10px;">
                          ${product.name}
                      </div>
                  `)
                  .join("");
          }
          searchSuggestions.style.display = "block";
      } catch (error) {
          console.error("Lỗi khi tìm kiếm:", error);
      }
  });
  document.addEventListener("click", (event) => {
      if (!searchBox.contains(event.target) && !searchSuggestions.contains(event.target)) {
          searchSuggestions.style.display = "none";
      }
  });
});
// Khi an sp tiem kiem chuyen tab chi tiet san pham
function redirectToProduct(productId) {
  window.location.href = `/Orderdetails/${productId}/`; 
}

