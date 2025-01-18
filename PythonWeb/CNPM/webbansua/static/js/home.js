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
    let flashsaleHTML = "";
    let banchayHTML = "";
    let spBanHTML = "";
    if (data.length > 0) {
      data.forEach((product) => {
        let giamPhanTram = "";
        if (product.sale_price && product.price && product.sale_price > product.price) {
          const giam = Math.round(
            ((product.sale_price - product.price) / product.sale_price) * 100
          );
          giamPhanTram = `- ${giam}%`;
        }
        if (product.category === "hang_khuyen_mai" && product.status === "con_hang") {
          flashsaleHTML += `
          <div class="item_products">
            <div class="inside-flas isspbc" style="position: relative;">
              ${giamPhanTram ? `<div class="home-sua-percent">
                                  <span>${giamPhanTram}</span>
                               </div>` : ""}
              <a style="text-decoration: none;" href="{% url 'chitietsp' %}">
                <div class="flashsale-pic">
                  <img src="${product.image_url}" alt="${product.name}">
                </div>
                <div class="flashsale-title">${product.name}</div>
              </a>
              <div>
                <div class="title_gia" style="display: flex; margin-bottom: 5px;">
                  <div class="col-md-6 paddL0">
                    <div class="sales-price">${formatCurrency(product.price)}</div>
                  </div>
                  <div class="col-md-6">
                    <div class="sales-root">${product.sale_price ? formatCurrency(product.sale_price) : ""}</div>
                  </div>
                </div>
                <div class="chonmua_buy_fast">
                   <a onclick="handleBuy(${product.id})">Chọn mua</a>
                </div>
              </div>
            </div>
          </div>`;
        }
        if (product.category === "hang_ban_chay" && product.status === "con_hang") {
          banchayHTML += `
          <div class="item_products">
            <div class="inside-flas isspbc" style="position: relative;">
              ${giamPhanTram ? `<div class="home-sua-percent">
                                  <span>${giamPhanTram}</span>
                               </div>` : ""}
              <a style="text-decoration: none;" href="{% url 'chitietsp' %}">
                <div class="flashsale-pic">
                  <img src="${product.image_url}" alt="${product.name}">
                </div>
                <div class="flashsale-title">${product.name}</div>
              </a>
              <div>
                <div class="title_gia" style="display: flex; margin-bottom: 5px;">
                  <div class="col-md-6 paddL0">
                    <div class="sales-price">${formatCurrency(product.price)}</div>
                  </div>
                  <div class="col-md-6">
                    <div class="sales-root">${product.sale_price ? formatCurrency(product.sale_price) : ""}</div>
                  </div>
                </div>
                <div class="chonmua_buy_fast">
                   <a onclick="handleBuy(${product.id})">Chọn mua</a>
                </div>
              </div>
            </div>
          </div>`;
        }
        if (product.category === "sua_bot_dinh_duong" && product.status === "con_hang") {
          spBanHTML += `
          <div class="item_products">
            <div class="inside-flas isspbc" style="position: relative;">
              ${giamPhanTram ? `<div class="home-sua-percent">
                                  <span>${giamPhanTram}</span>
                               </div>` : ""}
              <a style="text-decoration: none;" href="{% url 'chitietsp' %}">
                <div class="flashsale-pic">
                  <img src="${product.image_url}" alt="${product.name}">
                </div>
                <div class="flashsale-title">${product.name}</div>
              </a>
              <div>
                <div class="title_gia" style="display: flex; margin-bottom: 5px;">
                  <div class="col-md-6 paddL0">
                    <div class="sales-price">${formatCurrency(product.price)}</div>
                  </div>
                  <div class="col-md-6">
                    <div class="sales-root">${product.sale_price ? formatCurrency(product.sale_price) : ""}</div>
                  </div>
                </div>
                <div class="chonmua_buy_fast">
                   <a onclick="handleBuy(${product.id})">Chọn mua</a>
                </div>
              </div>
            </div>
          </div>`;
        }
      });
      products_fashsale.innerHTML = flashsaleHTML || `<p>Không có sản phẩm khuyến mãi.</p>`;
      products_banchay.innerHTML = banchayHTML || `<p>Không có sản phẩm bán chạy.</p>`;
      products_ban.innerHTML = spBanHTML || `<p>Không có sản phẩm bán.</p>`
      
    } else {
      products_fashsale.innerHTML = `<p>Không có sản phẩm khuyến mãi.</p>`;
      products_banchay.innerHTML = `<p>Không có sản phẩm bán chạy.</p>`;
      products_ban.innerHTML =   `<p>Không có sản phẩm bán.</p>`

    }
  } catch (error) {
    console.error("Không có dữ liệu hoặc lỗi xảy ra:", error);
  }
});
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

const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];
  return csrfToken || "";
};
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

window.addEventListener("load", async () => {
  await updateUserCartData();
});

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
