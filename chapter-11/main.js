const productList = document.getElementById("productList");
const API = `http://localhost:3000/products`;

const deleteProduct = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!confirm) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(() => alert("Xóa thành công"))
        .catch(() => alert("Xóa thất bại"));
};
const render = () => {
    fetch(API)
        .then((response) => response.json())
        .then((data) => {
            const result = data
                .map(
                    (item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>
                        <a href="./edit.html?id=${item.id}" class="btn btn-primary">Sửa</a>
                        <button class="btn btn-danger" onclick="deleteProduct(${
                            item.id
                        })">Xóa</button>
                    </td>
                </tr>
            `
                )
                .join("");
            productList.innerHTML = result;
        });
};
render();
