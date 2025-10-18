const axios = window.axios;

const loadProducts = () => {
    axios.get(`http://localhost:3000/products`).then((response) => {
        const products = response.data;
        const tbody = document.getElementById("productList");

        tbody.innerHTML = products
            .map(
                (product, index) => `
        
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.imageUrl}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>${product.price || "N/A"}</td>
                <td>${product.quantity}</td>
                <td>${
                    product.categoryId === "1" ? "Áo" : product.categoryId === 2 ? "Quần" : "Đầm"
                }</td>
                <td>
                    <a href="./edit.html?id=${product.id}" class="btn btn-primary">Sửa</a>
                    <button class="btn btn-danger" onclick="deleteProduct('${
                        product.id
                    }')">Xóa</button>
                </td>
            </tr>
        `
            )
            .join("");
    });
};
const deleteProduct = (id) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
        axios
            .delete(`http://localhost:3000/products/${id}`)
            .then(() => {
                alert("Xóa thành công!");
            })
            .catch(() => {
                alert("Xóa thất bại!");
            });
    }
};

const addProduct = (e) => {
    e.preventDefault();
    const form = document.getElementById("productAddForm");
    const data = {
        name: form.name.value,
        quantity: parseInt(form.quantity.value),
        price: parseInt(form.price.value),
        imageUrl: form.image.value,
        categoryId: form.category.value,
    };

    // validation đơn giản
    if (!data.name || !data.quantity || !data.price || !data.imageUrl || !data.categoryId) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    axios
        .post(`http://localhost:3000/products`, data)
        .then(() => {
            alert("Thêm thành công");
            location.replace("./index.html");
        })
        .catch(() => {
            alert("Thất bại!");
        });
};

const loadingProductForEdit = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    axios.get(`http://localhost:3000/products/${id}`).then((response) => {
        console.log(response.data);
        // Đổ dữ liệu vào form

        document.getElementById("name").value = response.data.name;
        document.getElementById("price").value = response.data.price;
        document.getElementById("quantity").value = response.data.quantity;
        document.getElementById("category").value = response.data.categoryId;
        document.getElementById("image").value = response.data.imageUrl;
    });
};
const updateProduct = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const form = document.getElementById("productEditForm");
    const data = {
        name: form.name.value,
        quantity: parseInt(form.quantity.value),
        price: parseInt(form.price.value),
        imageUrl: form.image.value,
        categoryId: form.category.value,
    };

    // validation đơn giản
    if (!data.name || !data.quantity || !data.price || !data.imageUrl || !data.categoryId) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    axios
        .put(`http://localhost:3000/products/${id}`, data)
        .then(() => {
            alert("Cập nhật thành công");
            location.replace("./index.html");
        })
        .catch(() => {
            alert("Thất bại!");
        });
};

const register = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // validation đơn giản
    if (!username || !email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
        return;
    }
    axios
        .post(`http://localhost:3000/register`, { username, email, password })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("email", response.data.user.email);
                alert("Đăng ký thành công!");
                location.replace("./signin.html");
            }
        })
        .catch(() => {
            alert("Thất bại!");
        });
};
const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // validation đơn giản
    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
        return;
    }
    axios
        .post(`http://localhost:3000/login`, { email, password })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("email", response.data.user.email);
                alert("Đăng nhập thành công!");
                location.replace("./index.html");
            }
        })
        .catch(() => {
            alert("Thất bại!");
        });
};

const logout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        alert("Đăng xuất thành công!");
        location.replace("./signin.html");
    }
};

const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (
        !token &&
        !location.pathname.includes("signin.html") &&
        !location.pathname.includes("signup.html")
    ) {
        location.href = "./signin.html";
    }
};
const displayUserInfo = () => {
    const userInfo = document.getElementById("user-info");
    if (userInfo) {
        const token = localStorage.getItem("token");
        if (token) {
            const userEmail = localStorage.getItem("email") || "admin@gmail.com";
            userInfo.innerHTML = `
            <div class="d-flex align-items-center">
                <span>${userEmail}</span>
                <button class="btn btn-danger" onclick="logout()">Đăng xuất</button>
            </div>
        `;
        }
    }
};
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = location.pathname;
    checkAuth();
    if (currentPage.includes("index.html") || currentPage === "/") {
        loadProducts();
        displayUserInfo();
    } else if (currentPage.includes("edit.html")) {
        loadingProductForEdit();
    }
});
