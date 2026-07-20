const STORAGE_KEY = "products_v1";

const ProductStore = {
  getAll() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },

  save(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  getByUid(uid) {
    console.log(this.getAll().find((p) => p._uid === uid) || null);
    return this.getAll().find((p) => p._uid === uid) || null;
  },

  add(data) {
    const uid = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const product = { ...data, _uid: uid };
    const next = [...this.getAll(), product];
    this.save(next);
  },

  update(uid, data) {
    // tạo ra 1 mảng mới
    // lấy toàn bộ danh sách sản phẩm hiện có
    // điều kiện tạo ra 1 mảng mới: nếu sản phẩm có trùng id thì cập nhật object
    // ngược lại giữ nguyên object
    const next = this.getAll().map((p) =>
      p._uid === uid ? { ...p, ...data } : p
    );
    this.save(next);
  },

  remove(uid) {
    const next = this.getAll().filter((p) => p._uid !== uid);
    this.save(next);
  },
};

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + " ₫";
} 