// ==========================================
// STATE: Mảng lưu trữ trạng thái danh sách công việc
// ==========================================
let danhSachCongViec = [
    {
        id: 1,
        ten: "Học JavaScript nâng cao",
        moTa: "Nắm vững các khái niệm DOM Selection và Manipulation.",
        uuTien: "high",
        hoanThanh: false
    },
    {
        id: 2,
        ten: "Xây dựng giao diện CSS cho dự án",
        moTa: "Hoàn thiện CSS Glassmorphism cho ZenTask.",
        uuTien: "medium",
        hoanThanh: true
    },
    {
        id: 3,
        ten: "Cài đặt môi trường Node.js",
        moTa: "Cài đặt git, npm và các thư viện cần thiết.",
        uuTien: "low",
        hoanThanh: true
    }
];

// ==========================================
// DOM ELEMENTS
// ==========================================
const formCongViec = document.querySelector('#form-cong-viec');
const inputTen = document.querySelector('#ten-cong-viec');
const inputMoTa = document.querySelector('#mo-ta');
const selectUuTien = document.querySelector('#do-uu-tien');
const errorTen = document.querySelector('#error-ten');
const errorMoTa = document.querySelector('#error-mo-ta');
const taskList = document.querySelector('#task-list');
const tieuDeForm = document.querySelector('#tieu-de-form');
const textNutSubmit = document.querySelector('#text-nut-submit');


// ==========================================
// RENDER: Hiển thị danh sách công việc
// ==========================================
function renderList(moiId) {
    const ulElement = taskList;
    ulElement.innerHTML = '';

    if (danhSachCongViec.length === 0) {
        ulElement.innerHTML = `
            <li class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="inbox" aria-hidden="true" class="lucide lucide-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
                <p>Chưa có công việc nào</p>
                <span>Hãy thêm công việc mới ở form phía trên</span>
            </li>`;
        return;
    }

    danhSachCongViec.forEach(function (item) {
        const liElement = document.createElement('li');
        liElement.className = `task-item ${item.hoanThanh ? 'completed' : ''}`;
        liElement.dataset.id = item.id;
        liElement.dataset.priority = item.uuTien;

        if (item.id === moiId) {
            console.log(1);
            liElement.classList.add('new');
            liElement.classList.add('updated');
        }

        let priority = 'Ưu tiên thấp';
        if (item.uuTien === 'high') priority = 'Ưu tiên cao';
        else if (item.uuTien === 'medium') priority = 'Ưu tiên trung bình';

        liElement.innerHTML = `
            <div class="task-checkbox-wrapper">
                <input type="checkbox" id="task-${item.id}" class="task-checkbox" ${item.hoanThanh ? 'checked' : ''}>
                <label for="task-${item.id}" class="checkbox-custom"></label>
            </div>
            <div class="task-content">
                <div class="task-title-row">
                    <h4 class="task-title">${item.ten}</h4>
                    <span class="badge-priority ${item.uuTien}">${priority}</span>
                </div>
                <p class="task-desc">${item.moTa}</p>
                <div class="task-meta">
                    <span class="meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="calendar" aria-hidden="true" class="lucide lucide-calendar"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                        Hôm nay
                    </span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-action btn-edit" title="Sửa công việc">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="edit-3" aria-hidden="true" class="lucide lucide-edit-3"><path d="M13 21h8"></path><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path></svg>
                </button>
                <button class="btn-action btn-delete" title="Xóa công việc">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="trash-2" aria-hidden="true" class="lucide lucide-trash-2"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        `;
        ulElement.appendChild(liElement);
    });

    lucide.createIcons();
}

// ==========================================
// PROGRESS: Cập nhật tiến độ
// ==========================================
function capNhatTienDo() {
    const total = danhSachCongViec.length;
    const completed = danhSachCongViec.filter(item => item.hoanThanh).length;
    const phanTram = total === 0 ? 0 : Math.round((completed / total) * 100);

    const textPhanTram = document.querySelector('.stats-header strong');
    if (textPhanTram) textPhanTram.innerText = `${phanTram}%`;

    const descTienDo = document.querySelector('.stats-desc');
    if (descTienDo) descTienDo.innerText = `Hoàn thành ${completed} trong số ${total} công việc của bạn.`;

    const processBar = document.querySelector('.progress-bar-fill');
    if (processBar) {
        processBar.style.width = `${phanTram}%`;
    }
}

// ==========================================
// ADD TASK: Thêm công việc mới
// ==========================================

formCongViec.addEventListener('submit', function (e) {
    e.preventDefault();
        // Tạo đối tượng công việc mới
    const congViecMoi = {
        id: danhSachCongViec.length + 1,
        ten: inputTen.value.trim(),
        moTa: inputMoTa.value.trim(),
        uuTien: selectUuTien.value,
        hoanThanh: false
    };
    danhSachCongViec.unshift(congViecMoi);
    renderList(danhSachCongViec.length + 1);
});
// ==========================================
// DELETE TASK: Xóa công việc (Event Delegation)
// ==========================================
taskList.addEventListener('click', function (e) {
    // Tìm nút xóa được bấm (cha hoặc chính nó)
    const btnDelete = e.target.closest('.btn-delete');
    if (!btnDelete) return;

    const liItem = btnDelete.closest('.task-item');
    if (!liItem) return;

    const idCanXoa = Number(liItem.dataset.id);
    // Hộp thoại xác nhận xóa
    const xacNhan = confirm(`Bạn có chắc chắn muốn xóa"?`);
    if (!xacNhan) return;
    danhSachCongViec = danhSachCongViec.filter(cv => cv.id !== idCanXoa);

    // Render lại danh sách và cập nhật tiến độ
    renderList();
    capNhatTienDo();
});
taskList.addEventListener('change', function(e){
    if(e.target.classList.contains('task-checkbox')){
        const taksItem = e.target.closest('.task-item');
        const id = +taksItem.dataset.id;

        danhSachCongViec = danhSachCongViec.map(todo => {
            if(todo.id == id) {
                return {...todo, hoanThanh: !todo.hoanThanh}
            }
            return todo;
        });
        renderList();
        capNhatTienDo();
    }
})


// ==========================================
// INIT: Khởi tạo ứng dụng
// ==========================================
renderList();
capNhatTienDo();


