(() => {
  "use strict";
  //http://127.0.0.1:5500/ecommerce/edit.html?uid=s5
  // lấy id trên url
  const uid = new URLSearchParams(window.location.search).get("uid");

  const formCard = document.getElementById("formCard");
  const notFound = document.getElementById("notFound");
  const form = document.getElementById("productForm");
  const editUid = document.getElementById("editUid");

  const fields = {
    id: document.getElementById("productId"),
    name: document.getElementById("productName"),
    category: document.getElementById("productCategory"),
    price: document.getElementById("productPrice"),
    qty: document.getElementById("productQty"),
  };

  // nếu có id trên đường url thì tìm thông tin sản phẩm trong localStorage ngược lại thì là null
  const product = uid ? ProductStore.getByUid(uid) : null;

  if (!product) {
    // nếu không có sản phẩm thì add class là hidden
    formCard.classList.add("hidden");
    notFound.classList.remove("hidden");
  } else {
    // nếu có sản phẩm thì fill tất cả thông tin sản phẩm vào form
    editUid.value = product._uid;
    fields.id.value = product.id;
    fields.name.value = product.name;
    fields.category.value = product.category;
    fields.price.value = product.price;
    fields.qty.value = product.qty;
  }

  function getFormValues() {
    return {
      id: fields.id.value.trim(),
      name: fields.name.value.trim(),
      category: fields.category.value,
      price: Number(fields.price.value),
      qty: Number(fields.qty.value),
    };
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ProductStore.update(uid, getFormValues());
    window.location.href = "index.html";
  });
})();
