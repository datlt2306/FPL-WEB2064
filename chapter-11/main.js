const API = `http://localhost:3001/products`;
const axios = window.axios;
const productList = document.getElementById("productList");
const productAddForm = document.getElementById("productAddForm");
const productEditForm = document.getElementById("productEditForm");

const idProduct = new URLSearchParams(window.location.search).get("id");
if (idProduct) {
    // lấy id từ url và call API lấy dữ liệu sản phẩm theo id
    axios.get(`${API}/${idProduct}`).then((data) => {
        // đổ dữ liệu vào form
        document.getElementById("name").value = data.name;
        document.getElementById("price").value = data.price;
        document.getElementById("quantity").value = data.quantity;
        document.getElementById("category").value = data.category;
        document.getElementById("image").value = data.imageUrl;
    });
}
if (productEditForm) {
    productEditForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updateProduct();
    });
}
if (productAddForm) {
    productAddForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addProduct();
    });
}

const updateProduct = () => {
    axios
        .put(`${API}/${idProduct}`, {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            quantity: document.getElementById("quantity").value,
            category: document.getElementById("category").value,
            imageUrl: document.getElementById("image").value,
        })
        .then(() => {
            console.log("Cập nhật sản phẩm thành công");
            window.location.href = "./index.html";
        })
        .catch(() => console.log("Thất bại!"));
};
const addProduct = () => {
    // call API thêm sản phẩm
    axios
        .post(`${API}`, {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            quantity: document.getElementById("quantity").value,
            category: document.getElementById("category").value,
            imageUrl: document.getElementById("image").value,
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
    axios
        .delete(`${API}/${id}`)
        .then(() => console.log("Xóa sản phẩm thành công"))
        .catch(() => console.log("Thất bại!"));
};
const renderProduct = () => {
    // lấy danh sách sản phẩm

    axios.get(API).then((response) => {
        if (!productList) return;
        productList.innerHTML = response.data
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
