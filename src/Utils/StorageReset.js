export const resetStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("cart");
  localStorage.removeItem("carttotal");
  localStorage.removeItem("shipping");
  localStorage.removeItem("gst");
  localStorage.removeItem("totalPrice");
  localStorage.removeItem("Coupon");
};

