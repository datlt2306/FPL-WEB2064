// QUICK VERSION - 30 phút hoàn thành
const API_URL = "http://localhost:3001";

// 1. Hiển thị danh sách sản phẩm
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();

        const tbody = document.getElementById("productList");
        tbody.innerHTML = products
            .map(
                (product, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.imageUrl}" width="50" height="50"></td>
                <td>${product.name}</td>
                <td>${product.price || "N/A"}</td>
                <td>${product.quantity}</td>
                <td>${
                    product.categoryId === "1" ? "Áo" : product.categoryId === "2" ? "Quần" : "Đầm"
                }</td>
                <td>
                    <a href="edit.html?id=${product.id}" class="btn btn-sm btn-warning">Sửa</a>
                    <button onclick="deleteProduct('${
                        product.id
                    }')" class="btn btn-sm btn-danger">Xóa</button>
                </td>
            </tr>
        `
            )
            .join("");
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

// 2. Xóa sản phẩm
async function deleteProduct(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        try {
            await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
            alert("Xóa thành công!");
            loadProducts();
        } catch (error) {
            alert("Lỗi khi xóa!");
        }
    }
}

// 3. Thêm sản phẩm
async function addProduct() {
    const form = document.getElementById("productAddForm");
    const data = {
        name: form.name.value,
        quantity: parseInt(form.quantity.value),
        imageUrl: form.image.value,
        category: form.category.value,
    };

    // Validation đơn giản
    if (!data.name || !data.quantity || !data.imageUrl || !data.category) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    try {
        await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        alert("Thêm thành công!");
        location.href = "index.html";
    } catch (error) {
        alert("Lỗi khi thêm!");
    }
}

// 4. Sửa sản phẩm
async function updateProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const form = document.getElementById("productEditForm");
    const data = {
        name: form.name.value,
        price: parseFloat(form.price.value),
        quantity: parseInt(form.quantity.value),
        imageUrl: form.image.value,
        category: form.category.value,
    };

    try {
        await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        alert("Cập nhật thành công!");
        location.href = "index.html";
    } catch (error) {
        alert("Lỗi khi cập nhật!");
    }
}

// 5. Load dữ liệu cho form sửa
async function loadProductForEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const product = await response.json();

        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("quantity").value = product.quantity;
        document.getElementById("category").value = product.categoryId;
        document.getElementById("image").value = product.imageUrl;
    } catch (error) {
        console.error("Lỗi:", error);
    }
}

// 6. Đăng nhập đơn giản
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();

        if (result.accessToken) {
            localStorage.setItem("token", result.accessToken);
            localStorage.setItem("userEmail", email);
            alert("Đăng nhập thành công!");
            location.href = "index.html";
        } else {
            alert("Đăng nhập thất bại!");
        }
    } catch (error) {
        alert("Lỗi khi đăng nhập!");
    }
}

// 7. Đăng ký đơn giản
async function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        const result = await response.json();

        if (result.accessToken) {
            localStorage.setItem("token", result.accessToken);
            localStorage.setItem("userEmail", email);
            alert("Đăng ký thành công!");
            location.href = "index.html";
        } else {
            alert("Đăng ký thất bại!");
        }
    } catch (error) {
        alert("Lỗi khi đăng ký!");
    }
}

// 8. Kiểm tra đăng nhập
function checkLogin() {
    const token = localStorage.getItem("token");
    if (!token && !location.pathname.includes("signin") && !location.pathname.includes("signup")) {
        location.href = "signin.html";
    }
}

// 9. Hiển thị thông tin người dùng
function displayUserInfo() {
    const userInfo = document.getElementById("user-info");
    if (userInfo) {
        const token = localStorage.getItem("token");
        if (token) {
            // Lấy email từ token hoặc localStorage
            const userEmail = localStorage.getItem("userEmail") || "admin@gmail.com";
            userInfo.innerHTML = `
                <div class="d-flex justify-content-between align-items-center py-2 bg-light rounded mb-3">
                    <div>
                        <span class="text-muted">Xin chào:</span>
                        <strong class="text-primary">${userEmail}</strong>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="logout()">
                        <i class="bi bi-box-arrow-right"></i> Đăng xuất
                    </button>
                </div>
            `;
        }
    }
}

// 10. Đăng xuất
function logout() {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        alert("Đăng xuất thành công!");
        location.href = "signin.html";
    }
}

// 11. Khởi tạo trang
document.addEventListener("DOMContentLoaded", function () {
    checkLogin();

    const currentPage = location.pathname;

    if (currentPage.includes("index.html") || currentPage === "/") {
        loadProducts();
        displayUserInfo();
    } else if (currentPage.includes("edit.html")) {
        loadProductForEdit();
    }
});
