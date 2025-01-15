let cartData = [];
const handdeMua = (value) => {
  const { id, name, image, price } = value.dataset;
  const product = {
    id,
    name,
    image,
    price,
    quantity: 1,
  };
  const product_Co_San = cartData.find((item) => item.id === id);
  if (product_Co_San) {
    product_Co_San.quantity += 1;
  } else {
    cartData.push(product);
  }
  localStorage.setItem("cartData", JSON.stringify(cartData)); 
  updateCartData(cartData);
  toast({ title: 'success', message: 'Đã thêm vào giỏ hàng ', type: 'success', duration: 3000 });
};

const updateCartData = (cartData) => {
  const cartCounter = document.getElementById("valueGioHang");
  const totalQuantity = cartData.reduce((sum, { quantity }) => sum + quantity, 0);
  cartCounter.textContent = totalQuantity;
};
