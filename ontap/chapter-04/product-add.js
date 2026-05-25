// Đọc dữ liệu từ localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Cập nhật số lượng đếm trên Sidebar
const sidebarCountEl = document.getElementById('sidebar-total-count');
if (sidebarCountEl) {
    sidebarCountEl.textContent = products.length;
}

// Xử lý xem trước ảnh khi thay đổi URL ảnh
const imageInput = document.getElementById('product-image');
const imagePreview = document.getElementById('image-preview');
const defaultImage = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&h=200&fit=crop';

imageInput.addEventListener('input', (e) => {
    const url = e.target.value.trim();
    imagePreview.src = url || defaultImage;
});

// Xử lý khi ảnh tải lỗi
imagePreview.addEventListener('error', () => {
    imagePreview.src = defaultImage;
});

// Xử lý submit form
const form = document.getElementById('add-product-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value.trim();
    const sku = document.getElementById('product-sku').value.trim().toUpperCase();
    const category = document.getElementById('product-category').value;
    const price = Number(document.getElementById('product-price').value);
    const stock = Number(document.getElementById('product-stock').value);
    const imageUrl = imageInput.value.trim();

    // Validate SKU không được trùng lặp
    const skuExists = products.some(p => p.sku === sku);
    if (skuExists) {
        alert(`Mã SKU "${sku}" đã tồn tại trên hệ thống. Vui lòng nhập mã khác.`);
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

    // Tự sinh ID lớn nhất hiện tại + 1
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
        id: nextId,
        name: name,
        price: price,
        inStock: stock,
        variant: 1, // mặc định sản phẩm mới có 1 phiên bản
        category: category,
        sku: sku,
        status: status,
        image: imageUrl || defaultImage
    };
    // call api
    fetch('http://localhost:3000/products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
    // products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    // Thông báo và chuyển hướng
    alert('Thêm sản phẩm mới thành công!');
    window.location.href = './product.html';
});
