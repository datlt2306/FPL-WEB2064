fetch(`http://localhost:3000/products`)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('products', JSON.stringify(data));
    });
// CALL API
let products = JSON.parse(localStorage.getItem('products')) || [];
const productListEl = document.getElementById('product-table-body');

// Hàm hiển thị sản phẩm
const showProducts = (data) => {
    // data => []
    // Cập nhật số lượng đếm trên giao diện
    const totalCount = data.length; // 10
    const sidebarCountEl = document.getElementById('sidebar-total-count');
    const totalItemsEl = document.getElementById('total-items-count');
    const currentItemsEl = document.getElementById('current-items-count');

    if (sidebarCountEl) sidebarCountEl.textContent = totalCount;
    if (totalItemsEl) totalItemsEl.textContent = totalCount;
    if (currentItemsEl) currentItemsEl.textContent = totalCount;

    if (totalCount === 0) {
        productListEl.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-10 text-center text-slate-500 font-medium">
                    Không tìm thấy sản phẩm nào.
                </td>
            </tr>
        `;
        return;
    }

    productListEl.innerHTML = data.map((item) => {
        // Xử lý badge trạng thái
        let statusBadge = '';
        if (item.status === 'active') {
            statusBadge = `
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    <span class="w-1.5 h-1.5 mr-1.5 bg-green-500 rounded-full"></span>
                    Đang hoạt động
                </span>
            `;
        } else if (item.status === 'low_stock') {
            statusBadge = `
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <span class="w-1.5 h-1.5 mr-1.5 bg-amber-500 rounded-full"></span>
                    Sắp hết hàng
                </span>
            `;
        } else {
            statusBadge = `
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                    <span class="w-1.5 h-1.5 mr-1.5 bg-red-500 rounded-full"></span>
                    Hết hàng
                </span>
            `;
        }

        // Format tiền tệ VNĐ
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price);

        return `<tr class="hover:bg-slate-50/80 transition-colors group">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input type="checkbox" class="w-4 h-4 text-primary-600 bg-white border-slate-300 rounded focus:ring-primary-500/20 focus:ring-2 cursor-pointer transition-colors hover:border-primary-400">
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 flex items-center gap-4 whitespace-nowrap">
                            <div class="relative w-12 h-12 rounded-lg border border-slate-200/80 shadow-sm overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center text-slate-300">
                                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src="${item.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&h=100&fit=crop'}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&h=100&fit=crop'">
                            </div>
                            <div>
                                <div class="text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors cursor-pointer">${item.name}</div>
                                <div class="text-xs text-slate-500 mt-0.5">SKU: ${item.sku}</div>
                            </div>
                        </th>
                        <td class="px-6 py-4">
                            <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                ${item.category}
                            </span>
                        </td>
                        <td class="px-6 py-4 font-semibold text-slate-900">
                           ${formattedPrice}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex flex-col">
                                <span class="${item.inStock <= 5 ? 'text-red-600 font-bold' : 'text-slate-700 font-medium'}">${item.inStock}</span>
                                <span class="text-xs text-slate-400">${item.variant || 1} phiên bản</span>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            ${statusBadge}
                        </td>
                        <td class="px-6 py-4 text-right whitespace-nowrap">
                            <a href="./product-edit.html?id=${item.id}" class="text-slate-400 hover:text-primary-600 p-1.5 rounded-md hover:bg-primary-50 transition-colors inline-flex" title="Chỉnh sửa">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </a>
                            <button onclick="deleteProduct(${item.id})" class="text-slate-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors inline-flex ml-1" title="Xóa">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </td>
                    </tr>`
    }).join("");
};

// Hàm xóa sản phẩm
window.deleteProduct = function (id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        // call api 
        fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE"
        });
        products = products.filter(item => item.id != id);
        localStorage.setItem('products', JSON.stringify(products));
        showProducts(products);
    }
};

// Thực thi hiển thị lần đầu
showProducts(products);

