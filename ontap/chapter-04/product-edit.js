// Đọc dữ liệu từ localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Cập nhật số lượng đếm trên Sidebar
const sidebarCountEl = document.getElementById('sidebar-total-count');
if (sidebarCountEl) {
    sidebarCountEl.textContent = products.length;
}
// http://127.0.0.1:5500/ontap/chapter-04/product-edit.html?id=3
// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (isNaN(productId)) {
    alert('ID sản phẩm không hợp lệ!');
    window.location.href = './product.html';
}

// Tìm sản phẩm tương ứng
const product = products.find(p => p.id === productId);
    if (!product) {
    alert('Không tìm thấy sản phẩm cần chỉnh sửa!');
    window.location.href = './product.html';
}

// Đổ dữ liệu cũ vào các trường input của form
document.getElementById('product-id-badge').textContent = `ID: ${product.id}`;
document.getElementById('product-name').value = product.name;
document.getElementById('product-sku').value = product.sku;
document.getElementById('product-category').value = product.category;
document.getElementById('product-price').value = product.price;
document.getElementById('product-stock').value = product.inStock;

const imageInput = document.getElementById('product-image');
const imagePreview = document.getElementById('image-preview');
const defaultImage = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&h=200&fit=crop';

imageInput.value = product.image || '';
imagePreview.src = product.image || defaultImage;

// Xử lý xem trước ảnh khi thay đổi URL ảnh
imageInput.addEventListener('input', (e) => {
    const url = e.target.value.trim();
    imagePreview.src = url || defaultImage;
});

// Xử lý khi ảnh tải lỗi
imagePreview.addEventListener('error', () => {
    imagePreview.src = defaultImage;
});

// Xử lý submit form
const form = document.getElementById('edit-product-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value.trim();
    const sku = document.getElementById('product-sku').value.trim().toUpperCase();
    const category = document.getElementById('product-category').value;
    const price = Number(document.getElementById('product-price').value);
    const stock = Number(document.getElementById('product-stock').value);
    const imageUrl = imageInput.value.trim();

    // Validate SKU không được trùng lặp với sản phẩm khác
    const skuExists = products.some(p => p.sku === sku && p.id !== productId);
    if (skuExists) {
        alert(`Mã SKU "${sku}" đã được sử dụng bởi sản phẩm khác. Vui lòng chọn mã SKU khác.`);
        document.getElementById('product-sku').focus();
        return;
    }

    // Xác định trạng thái dựa trên số lượng tồn kho
    let status = 'active';
    if (stock === 0) {
        status = 'out_of_stock';
    } else if (stock <= 5) {
        status = 'low_stock';
    }
    // call api => gọi server
    const editProduct = {
        id: productId,
        name: name,
        price: price,
        inStock: stock,
        variant: 1, // mặc định sản phẩm mới có 1 phiên bản
        category: category,
        sku: sku,
        status: status,
        image: imageUrl || defaultImage
    }

    fetch(`http://localhost:3000/products/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editProduct)
    })

    // Lưu lại danh sách vào localStorage
    // localStorage.setItem('products', JSON.stringify(products));

    // Thông báo và chuyển hướng
    alert('Cập nhật sản phẩm thành công!');
    window.location.href = './product.html';
});
