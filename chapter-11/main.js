const API = `http://localhost:3001/products`;

const deleteProduct = (id) => {
    fetch(`${API}/${id}`, {
        method: "DELETE",
    })
        .then(() => console.log("Xóa sản phẩm thành công"))
        .catch(() => console.log("Thất bại!"));
};

const render = () => {
    fetch(API)
        .then((response) => response.json())
        .then((data) => {
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
                        <button class="btn btn-danger" onclick="deleteProduct(${
                            item.id
                        })">Xóa</button>
                    </td>
                </tr>
            `
                )
                .join("");
        });
};
render();
