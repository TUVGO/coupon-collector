const coupons = [
  { id: "demo-coffee", title: "咖啡满 20 减 5", status: "available" },
  { id: "demo-lunch", title: "午餐套餐立减 8 元", status: "available" }
];

module.exports = {
  name: "demo",
  async list() {
    return coupons.map((coupon) => ({ ...coupon }));
  },
  async claim(id) {
    const coupon = coupons.find((item) => item.id === id);
    if (!coupon) {
      const error = new Error(`Coupon not found: ${id}`);
      error.code = "COUPON_NOT_FOUND";
      throw error;
    }
    return { ...coupon, status: "claimed" };
  }
};

