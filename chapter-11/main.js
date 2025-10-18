// API Base URL
const API_BASE_URL = "http://localhost:3001";

// Utility functions
const getToken = () => localStorage.getItem("token");
const setToken = (token) => localStorage.setItem("token", token);
const removeToken = () => localStorage.removeItem("token");
const isAuthenticated = () => !!getToken();

// Check authentication and redirect if needed
const checkAuth = () => {
    if (
        !isAuthenticated() &&
        !window.location.pathname.includes("signin") &&
        !window.location.pathname.includes("signup")
    ) {
        window.location.href = "./signin.html";
        return false;
    }
    return true;
};

// API functions
const api = {
    // Products
    getProducts: async () => {
        const response = await fetch(`${API_BASE_URL}/products`);
        return response.json();
    },

    getProduct: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return response.json();
    },

    createProduct: async (productData) => {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(productData),
        });
        return response.json();
    },

    updateProduct: async (id, productData) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(productData),
        });
        return response.json();
    },

    deleteProduct: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.json();
    },

    // Auth
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    },
};

// Validation functions
const validateProductForm = (formData) => {
    const errors = {};

    if (!formData.name || formData.name.trim() === "") {
        errors.name = "Tên sản phẩm là bắt buộc";
    }

    if (!formData.quantity || formData.quantity < 0) {
        errors.quantity = "Số lượng phải lớn hơn hoặc bằng 0";
    }

    if (!formData.imageUrl || formData.imageUrl.trim() === "") {
        errors.imageUrl = "URL hình ảnh là bắt buộc";
    }

    if (!formData.category || formData.category === "") {
        errors.category = "Danh mục là bắt buộc";
    }

    return errors;
};

const validateAuthForm = (formData, isLogin = false) => {
    const errors = {};

    if (!isLogin && (!formData.username || formData.username.trim() === "")) {
        errors.username = "Tên người dùng là bắt buộc";
    }

    if (!formData.email || formData.email.trim() === "") {
        errors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Email không đúng định dạng";
    }

    if (!formData.password || formData.password === "") {
        errors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
        errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    return errors;
};

// Display functions
const displayProducts = async () => {
    try {
        const products = await api.getProducts();
        const productList = document.getElementById("productList");

        if (!productList) return;

        productList.innerHTML = products
            .map(
                (product, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <img src="${product.imageUrl}" alt="${product.name}" 
                         style="width: 50px; height: 50px; object-fit: cover;" 
                         onerror="this.src='https://via.placeholder.com/50x50'">
                </td>
                <td>${product.name}</td>
                <td>${product.price ? product.price.toLocaleString("vi-VN") + " VNĐ" : "N/A"}</td>
                <td>${product.quantity}</td>
                <td>${getCategoryName(product.categoryId)}</td>
                <td>
                    <a href="./edit.html?id=${
                        product.id
                    }" class="btn btn-sm btn-warning me-2">Sửa</a>
                    <button class="btn btn-sm btn-danger" onclick="handleDeleteProduct('${
                        product.id
                    }')">Xóa</button>
                </td>
            </tr>
        `
            )
            .join("");
    } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
        alert("Có lỗi xảy ra khi tải danh sách sản phẩm");
    }
};

const getCategoryName = (categoryId) => {
    const categories = {
        1: "Áo",
        2: "Quần",
        3: "Đầm",
    };
    return categories[categoryId] || "Không xác định";
};

const displayUserInfo = () => {
    const userInfo = document.getElementById("user-info");
    if (userInfo) {
        const token = getToken();
        if (token) {
            userInfo.innerHTML = `
                <div class="d-flex justify-content-between align-items-center py-2">
                    <span>Đã đăng nhập</span>
                    <button class="btn btn-sm btn-outline-danger" onclick="handleLogout()">Đăng xuất</button>
                </div>
            `;
        }
    }
};

// Event handlers
const handleDeleteProduct = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        try {
            await api.deleteProduct(id);
            alert("Xóa sản phẩm thành công!");
            await displayProducts();
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Có lỗi xảy ra khi xóa sản phẩm");
        }
    }
};

const handleLogout = () => {
    removeToken();
    window.location.href = "./signin.html";
};

const handleProductFormSubmit = async (formId, isEdit = false) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value.trim(),
            quantity: parseInt(form.quantity.value),
            imageUrl: form.image.value.trim(),
            category: form.category.value,
        };

        // Add price for edit form
        if (isEdit && form.price) {
            formData.price = parseFloat(form.price.value);
        }

        // Validate form
        const errors = validateProductForm(formData);
        if (Object.keys(errors).length > 0) {
            alert("Vui lòng kiểm tra lại thông tin:\n" + Object.values(errors).join("\n"));
            return;
        }

        try {
            if (isEdit) {
                const urlParams = new URLSearchParams(window.location.search);
                const productId = urlParams.get("id");
                await api.updateProduct(productId, formData);
                alert("Cập nhật sản phẩm thành công!");
            } else {
                await api.createProduct(formData);
                alert("Thêm sản phẩm thành công!");
            }
            window.location.href = "./index.html";
        } catch (error) {
            console.error("Lỗi khi lưu sản phẩm:", error);
            alert("Có lỗi xảy ra khi lưu sản phẩm");
        }
    });
};

const handleAuthFormSubmit = (formId, isLogin = false) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            email: form.email.value.trim(),
            password: form.password.value,
        };

        if (!isLogin) {
            formData.username = form.username.value.trim();
        }

        // Validate form
        const errors = validateAuthForm(formData, isLogin);
        if (Object.keys(errors).length > 0) {
            alert("Vui lòng kiểm tra lại thông tin:\n" + Object.values(errors).join("\n"));
            return;
        }

        try {
            let response;
            if (isLogin) {
                response = await api.login(formData);
            } else {
                response = await api.register(formData);
            }

            if (response.accessToken) {
                setToken(response.accessToken);
                alert(isLogin ? "Đăng nhập thành công!" : "Đăng ký thành công!");
                window.location.href = "./index.html";
            } else {
                alert(isLogin ? "Đăng nhập thất bại!" : "Đăng ký thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi xử lý:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại");
        }
    });
};

const loadProductForEdit = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) return;

    try {
        const product = await api.getProduct(productId);

        // Fill form with product data
        const form = document.getElementById("productEditForm");
        if (form) {
            form.name.value = product.name || "";
            form.price.value = product.price || "";
            form.quantity.value = product.quantity || "";
            form.category.value = product.categoryId || "";
            form.image.value = product.imageUrl || "";
        }
    } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error);
        alert("Có lỗi xảy ra khi tải thông tin sản phẩm");
    }
};

// Initialize based on current page
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;

    // Check authentication for protected pages
    if (!currentPage.includes("signin") && !currentPage.includes("signup")) {
        if (!checkAuth()) return;
    }

    // Initialize page-specific functionality
    if (currentPage.includes("index.html") || currentPage === "/") {
        displayProducts();
        displayUserInfo();
    } else if (currentPage.includes("add.html")) {
        handleProductFormSubmit("productAddForm", false);
    } else if (currentPage.includes("edit.html")) {
        handleProductFormSubmit("productEditForm", true);
        loadProductForEdit();
    } else if (currentPage.includes("signin.html")) {
        handleAuthFormSubmit("signinForm", true);
    } else if (currentPage.includes("signup.html")) {
        handleAuthFormSubmit("signupForm", false);
    }
});
