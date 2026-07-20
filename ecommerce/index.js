(() => {
  "use strict";
  const CAT_COLORS = {
    "Điện thoại": "bg-blue-100 text-blue-700",
    Laptop: "bg-purple-100 text-purple-700",
    "Phụ kiện": "bg-amber-100 text-amber-700",
    "Máy tính bảng": "bg-emerald-100 text-emerald-700",
    "Đồng hồ": "bg-pink-100 text-pink-700",
  };

  const dom = {
    count: document.getElementById("productCount"),
    tbody: document.getElementById("productTableBody"),
    emptyState: document.getElementById("emptyState"),
    emptyText: document.getElementById("emptyText"),
  };
  function render() {
    const all = ProductStore.getAll();
    dom.tbody.innerHTML = all.map((p, i) => {
      const badge = CAT_COLORS[p.category] || "bg-gray-100 text-gray-700";
      return `
        <tr class="hover:bg-gray-50">
          <td class="px-4 py-3 text-sm text-gray-500">${i + 1}</td>
          <td class="px-4 py-3 text-sm font-mono font-medium text-gray-800">${p.id}</td>
          <td class="px-4 py-3 text-sm text-gray-800">${p.name}</td>
          <td class="px-4 py-3"><span class="px-2 py-1 rounded-full text-xs font-medium ${badge}">${p.category}</span ></td >
          <td class="px-4 py-3 text-sm text-right font-medium text-green-700">${formatPrice(p.price)}</td>
          <td class="px-4 py-3 text-sm text-right">${p.qty}</td>
          <td class="px-4 py-3 text-center">
            <a href="edit.html?uid=${p._uid}" class="btn-action inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100" title="Sửa">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </a>
            <button data-action="delete" data-uid="${p._uid}" class="btn-action inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 ml-1" title="Xóa">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr > `;
    }).join("");
    dom.count.textContent = `${all.length} sản phẩm`;
  }

  dom.tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='delete']");
    if (!btn) return;
    if (confirm(`Are you fucking sure????`)) {
      ProductStore.remove(btn.dataset.uid);
      render();
    }
  });
  render();
})();
