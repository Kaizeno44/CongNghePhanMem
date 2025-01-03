let cartData = JSON.parse(localStorage.getItem('cartData')) || [];
const handdeMua = (value) => {
  const { id, name, image, price } = value.dataset;
  const products = {
    id,
    name,
    image,
    price,
    quantity: 1,
  };
  const product_Hien_Co = cartData.find((item) => item.id === id);
  if (product_Hien_Co) {
    product_Hien_Co.quantity += 1;
  } else {
    cartData.push(products);
  }
  localStorage.setItem('cartData', JSON.stringify(cartData));
  updateCartData(cartData);
  alert("Đã thêm sản phẩm vào giỏ hàng");

};

const updateCartData = (cartData) => {
  const cartCounter = document.getElementById("valueGioHang");
  const totalQuantity = cartData.reduce((sum, { quantity }) => sum + quantity,0);
  cartCounter.textContent = totalQuantity;
};
document.addEventListener('DOMContentLoaded', () => {
  updateCartData(cartData);
});