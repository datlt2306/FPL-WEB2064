const API = `http://localhost:3001/products`;
const productList = document.getElementById("productList");
const productAddForm = document.getElementById("productAddForm");

if (productAddForm) {
    productAddForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addProduct();
    });
}
const addProduct = () => {
    const product = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
        category: document.getElementById("category").value,
        imageUrl: document.getElementById("image").value,
    };
    // call API thêm sản phẩm
    fetch(`${API}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    })
        .then(() => {
            console.log("Thêm sản phẩm thành công");
            window.location.href = "./index.html";
        })
        .catch(() => console.log("Thất bại!"));
};
const deleteProduct = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (!confirm) return;
    fetch(`${API}/${id}`, {
        method: "DELETE",
    })
        .then(() => console.log("Xóa sản phẩm thành công"))
        .catch(() => console.log("Thất bại!"));
};
const renderProduct = () => {
    fetch(API)
        .then((response) => response.json())
        .then((data) => {
            if (!productList) return;
            productList.innerHTML = data
                .map(
                    (item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td><img width="50" src="${item.imageUrl}" alt="${item.name}" /></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.category}</td>
                    <td>
                        <a href="./edit.html?id=${item.id}" class="btn btn-primary">Sửa</a>
                        <button class="btn btn-danger" onclick="deleteProduct('${
                            item.id
                        }')">Xóa</button>
                    </td>
                </tr>
            `
                )
                .join("");
        });
};
renderProduct();
