const productList = document.getElementById("productList");
const API = `http://localhost:3001`;
const axios = window.axios;
const productForm = document.getElementById("product-form");
const productFormEdit = document.getElementById("product-form-edit");
const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");

const id = new URLSearchParams(window.location.search).get("id");
if (id) {
    axios.get(`${API}/${id}`).then((response) => {
        document.getElementById("name").value = response.data.name;
        document.getElementById("price").value = response.data.price;
    });
    productFormEdit.addEventListener("submit", (e) => {
        e.preventDefault();
        const product = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
        };
        updateProduct(product);
    });
}

if (productForm) {
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const product = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
        };
        addProduct(product);
    });
}
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
        signup(user);
    });
}
if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
        signin(user);
    });
}
const signin = (user) => {
    if (!user.email || !user.password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    axios
        .post(`${API}/login`, user)
        .then(() => alert("Đăng nhập thành công"))
        .catch(() => alert("Đăng nhập thất bại"));
};
const signup = (user) => {
    if (!user.email || !user.password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    axios
        .post(`${API}/register`, user)
        .then(() => alert("Đăng ký thành công"))
        .catch(() => alert("Đăng ký thất bại"));
};
const updateProduct = (product) => {
    if (!product.name || !product.price) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    axios
        .put(`${API}/products/${id}`, product)
        .then(() => {
            // alert("Cập nhật sản phẩm thành công");
            window.location.href = "./";
        })
        .catch(() => alert("Cập nhật sản phẩm thất bại"));
    return;
};
const addProduct = (product) => {
    if (!product.name || !product.price) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    axios
        .post(`${API}/products`, product)
        .then(() => alert("Thêm sản phẩm thành công"))
        .catch(() => alert("Thêm sản phẩm thất bại"));
};
const deleteProduct = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!confirm) return;
    axios
        .delete(`${API}/products/${id}`)
        .then(() => alert("Xóa thành công"))
        .catch(() => alert("Xóa thất bại"));
};
const render = () => {
    axios.get(`${API}/products`).then((response) => {
        const result = response.data
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
        if (productList) {
            productList.innerHTML = result;
        }
    });
};
render();

/**
 * npm i -D json-server@0.17.4 json-server-auth
 * json-server-auth --watch db.json --port 3001
 * thêm collections users vào db.json
 */
