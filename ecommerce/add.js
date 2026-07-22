(() => {
  "use strict";

  const form = document.getElementById("productForm");

  const fields = {
    id: document.getElementById("productId"),
    name: document.getElementById("productName"),
    category: document.getElementById("productCategory"),
    price: document.getElementById("productPrice"),
    qty: document.getElementById("productQty"),
  };

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
    ProductStore.add(getFormValues());
    window.location.href = "index.html";
  });
})();
