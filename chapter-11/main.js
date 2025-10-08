// ================================
// CONFIGURATION & CONSTANTS
// ================================
const CONFIG = {
    API_BASE: "http://localhost:3001",
    ENDPOINTS: {
        PRODUCTS: "/products",
    },
    VALIDATION: {
        MIN_NAME_LENGTH: 2,
        MAX_NAME_LENGTH: 100,
        MIN_PRICE: 0,
        MAX_PRICE: 999999999,
    },
    MESSAGES: {
        SUCCESS: {
            CREATE: "Thêm sản phẩm thành công",
            UPDATE: "Cập nhật sản phẩm thành công",
            DELETE: "Xóa sản phẩm thành công",
        },
        ERROR: {
            CREATE: "Thêm sản phẩm thất bại",
            UPDATE: "Cập nhật sản phẩm thất bại",
            DELETE: "Xóa sản phẩm thất bại",
            FETCH: "Lấy danh sách sản phẩm thất bại",
        },
        VALIDATION: {
            NAME_REQUIRED: "Tên sản phẩm không được để trống",
            NAME_MIN_LENGTH: "Tên sản phẩm phải có ít nhất 2 ký tự",
            NAME_MAX_LENGTH: "Tên sản phẩm không được quá 100 ký tự",
            PRICE_REQUIRED: "Giá sản phẩm không được để trống",
            PRICE_MIN: "Giá sản phẩm phải lớn hơn 0",
            PRICE_MAX: "Giá sản phẩm không được quá 999999999",
            PRICE_NUMBER: "Giá sản phẩm phải là số hợp lệ",
        },
    },
};

// ================================
// UTILITY FUNCTIONS
// ================================
const utils = {
    // DOM Utilities
    getElement: (id) => document.getElementById(id),
    getElements: (selector) => document.querySelectorAll(selector),

    // String Utilities
    trim: (str) => str?.trim() || "",
    isEmpty: (str) => !str || str.trim().length === 0,

    // Number Utilities
    parseNumber: (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? null : num;
    },

    // URL Utilities
    getUrlParams: () => {
        const params = new URLSearchParams(window.location.search);
        return Object.fromEntries(params.entries());
    },

    // Alert Utilities
    showAlert: (message, type = "info") => {
        const alertClass = type === "error" ? "alert-danger" : "alert-success";
        const alertHtml = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        // Remove existing alerts
        const existingAlerts = document.querySelectorAll(".alert");
        existingAlerts.forEach((alert) => alert.remove());

        // Add new alert
        const container = document.querySelector(".container");
        if (container) {
            container.insertAdjacentHTML("afterbegin", alertHtml);
        } else {
            alert(message);
        }
    },

    // Form Utilities
    getFormData: (formId) => {
        const form = document.getElementById(formId);
        if (!form) return {};

        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    },

    clearForm: (formId) => {
        const form = document.getElementById(formId);
        if (form) form.reset();
    },
};

// ================================
// VALIDATION FUNCTIONS
// ================================
const validators = {
    validateName: (name) => {
        const trimmedName = utils.trim(name);

        if (utils.isEmpty(trimmedName)) {
            return { isValid: false, message: CONFIG.MESSAGES.VALIDATION.NAME_REQUIRED };
        }

        if (trimmedName.length < CONFIG.VALIDATION.MIN_NAME_LENGTH) {
            return { isValid: false, message: CONFIG.MESSAGES.VALIDATION.NAME_MIN_LENGTH };
        }

        if (trimmedName.length > CONFIG.VALIDATION.MAX_NAME_LENGTH) {
            return { isValid: false, message: CONFIG.MESSAGES.VALIDATION.NAME_MAX_LENGTH };
        }

        return { isValid: true };
    },

    validatePrice: (price) => {
        if (utils.isEmpty(price)) {
            return { isValid: false, message: CONFIG.MESSAGES.VALIDATION.PRICE_REQUIRED };
        }

        const numPrice = utils.parseNumber(price);
        if (numPrice === null) {
            return { isValid: false, message: CONFIG.MESSAGES.VALIDATION.PRICE_NUMBER };
        }

        if (numPrice < CONFIG.VALIDATION.MIN_PRICE) {
            return { isValid: false, message: CONFIG.MESSAGES.VALIDATION.PRICE_MIN };
        }

        if (numPrice > CONFIG.VALIDATION.MAX_PRICE) {
            return { isValid: false, message: CONFIG.MESSAGES.VALIDATION.PRICE_MAX };
        }

        return { isValid: true };
    },

    validateProduct: (product) => {
        const nameValidation = validators.validateName(product.name);
        if (!nameValidation.isValid) {
            return nameValidation;
        }

        const priceValidation = validators.validatePrice(product.price);
        if (!priceValidation.isValid) {
            return priceValidation;
        }

        return { isValid: true };
    },
};

// ================================
// API FUNCTIONS
// ================================
const api = {
    baseUrl: CONFIG.API_BASE + CONFIG.ENDPOINTS.PRODUCTS,

    // Generic request handler
    request: async (url, options = {}) => {
        try {
            const response = await window.axios(url, {
                timeout: 10000,
                ...options,
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.error("API Error:", error);
            return {
                success: false,
                error: error.response?.data?.message || error.message || "Có lỗi xảy ra",
            };
        }
    },

    // CRUD Operations
    getAll: () => api.request(api.baseUrl),

    getById: (id) => api.request(`${api.baseUrl}/${id}`),

    create: (product) =>
        api.request(api.baseUrl, {
            method: "POST",
            data: product,
            headers: { "Content-Type": "application/json" },
        }),

    update: (id, product) =>
        api.request(`${api.baseUrl}/${id}`, {
            method: "PUT",
            data: product,
            headers: { "Content-Type": "application/json" },
        }),

    delete: (id) =>
        api.request(`${api.baseUrl}/${id}`, {
            method: "DELETE",
        }),
};

// ================================
// BUSINESS LOGIC FUNCTIONS
// ================================
const productService = {
    // Get all products
    fetchProducts: async () => {
        const result = await api.getAll();
        if (result.success) {
            return { success: true, products: result.data };
        }
        utils.showAlert(result.error, "error");
        return { success: false, products: [] };
    },

    // Create product
    createProduct: async (productData) => {
        const validation = validators.validateProduct(productData);
        if (!validation.isValid) {
            utils.showAlert(validation.message, "error");
            return { success: false };
        }

        const result = await api.create(productData);
        if (result.success) {
            utils.showAlert(CONFIG.MESSAGES.SUCCESS.CREATE, "success");
            return { success: true };
        }

        utils.showAlert(result.error, "error");
        return { success: false };
    },

    // Update product
    updateProduct: async (id, productData) => {
        const validation = validators.validateProduct(productData);
        if (!validation.isValid) {
            utils.showAlert(validation.message, "error");
            return { success: false };
        }

        const result = await api.update(id, productData);
        if (result.success) {
            utils.showAlert(CONFIG.MESSAGES.SUCCESS.UPDATE, "success");
            return { success: true };
        }

        utils.showAlert(result.error, "error");
        return { success: false };
    },

    // Delete product
    deleteProduct: async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (!confirmed) return { success: false };

        const result = await api.delete(id);
        if (result.success) {
            utils.showAlert(CONFIG.MESSAGES.SUCCESS.DELETE, "success");
            return { success: true };
        }

        utils.showAlert(result.error, "error");
        return { success: false };
    },
};

// ================================
// UI FUNCTIONS
// ================================
const ui = {
    // Render product list
    renderProductList: (products) => {
        const productList = utils.getElement("productList");
        if (!productList) return;

        if (!products || products.length === 0) {
            productList.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted">
                        <i class="fas fa-box-open"></i> Chưa có sản phẩm nào
                    </td>
                </tr>
            `;
            return;
        }

        const html = products
            .map(
                (product, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${utils.trim(product.name)}</td>
                    <td>${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(product.price)}</td>
                    <td>
                        <a href="./edit.html?id=${product.id}" 
                           class="btn btn-primary btn-sm me-2">
                            <i class="fas fa-edit"></i> Sửa
                        </a>
                        <button class="btn btn-danger btn-sm" 
                                onclick="app.deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </td>
                </tr>
            `
            )
            .join("");

        productList.innerHTML = html;
    },

    // Load product for editing
    loadProductForEdit: async (id) => {
        const result = await api.getById(id);
        if (!result.success) {
            utils.showAlert("Không thể tải thông tin sản phẩm", "error");
            return;
        }

        const product = result.data;
        const nameInput = utils.getElement("name");
        const priceInput = utils.getElement("price");

        if (nameInput) nameInput.value = product.name || "";
        if (priceInput) priceInput.value = product.price || "";
    },

    // Show loading state
    showLoading: (elementId, show = true) => {
        const element = utils.getElement(elementId);
        if (!element) return;

        if (show) {
            element.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Đang tải...</span>
                        </div>
                    </td>
                </tr>
            `;
        }
    },
};

// ================================
// EVENT HANDLERS
// ================================
const eventHandlers = {
    // Handle form submission
    handleFormSubmit: async (e) => {
        e.preventDefault();

        const formData = utils.getFormData("product-form");
        const productData = {
            name: formData.name,
            price: formData.price,
        };

        const urlParams = utils.getUrlParams();
        const isEdit = urlParams.id;

        if (isEdit) {
            const success = await productService.updateProduct(urlParams.id, productData);
            if (success.success) {
                window.location.href = "./index.html";
            }
        } else {
            const success = await productService.createProduct(productData);
            if (success.success) {
                utils.clearForm("product-form");
            }
        }
    },

    // Handle delete product
    handleDeleteProduct: async (id) => {
        const success = await productService.deleteProduct(id);
        if (success.success) {
            await app.init();
        }
    },
};

// ================================
// MAIN APPLICATION
// ================================
const app = {
    // Initialize application
    init: async () => {
        const currentPage = window.location.pathname.split("/").pop();

        if (currentPage === "index.html" || currentPage === "") {
            await app.initProductList();
        } else if (currentPage === "add.html") {
            app.initAddForm();
        } else if (currentPage === "edit.html") {
            await app.initEditForm();
        }
    },

    // Initialize product list page
    initProductList: async () => {
        ui.showLoading("productList", true);
        const result = await productService.fetchProducts();
        ui.renderProductList(result.products);
    },

    // Initialize add form
    initAddForm: () => {
        const form = utils.getElement("product-form");
        if (form) {
            form.addEventListener("submit", eventHandlers.handleFormSubmit);
        }
    },

    // Initialize edit form
    initEditForm: async () => {
        const urlParams = utils.getUrlParams();
        if (!urlParams.id) {
            utils.showAlert("Không tìm thấy ID sản phẩm", "error");
            window.location.href = "./index.html";
            return;
        }

        await ui.loadProductForEdit(urlParams.id);

        const form = utils.getElement("product-form");
        if (form) {
            form.addEventListener("submit", eventHandlers.handleFormSubmit);
        }
    },

    // Delete product (exposed globally)
    deleteProduct: eventHandlers.handleDeleteProduct,
};

// ================================
// INITIALIZATION
// ================================
// Wait for DOM to be ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", app.init);
} else {
    app.init();
}
