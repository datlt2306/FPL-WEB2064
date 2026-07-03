// Mảng lưu trữ trạng thái danh sách công việc (State)
let danhSachCongViec = [
    {
        id: 1,
        ten: "Học JavaScript nâng cao",
        moTa: "Nắm vững các khái niệm DOM Selection và Manipulation.",
        uuTien: "high",
        hoanThanh: false
    }, // item
    {
        id: 2,
        ten: "Xây dựng giao diện CSS cho dự án",
        moTa: "Hoàn thiện CSS Glassmorphism cho ZenTask.",
        uuTien: "medium",
        hoanThanh: true
    },// item
    {
        id: 3,
        ten: "Cài đặt môi trường Node.js",
        moTa: "Cài đặt git, npm và các thư viện cần thiết.",
        uuTien: "low",
        hoanThanh: true
    }// item
];

function renderList(){
    // tìm thẻ ul để hiển thị 
    const ulElement = document.querySelector('#task-list');

    // bỏ hết li trong ul
    ulElement.innerHTML = '';
    
    // nếu không có li thì thêm li đầu tiên
    if(danhSachCongViec.length === 0) {
        ulElement.innerHTML = `<li>Không có công việc nào</li>`;
        return;
    }
    danhSachCongViec.forEach(function(item){
        // item là các phần tử trong mảng
        const liElement = document.createElement('li');
        liElement.className = `task-item ${item.hoanThanh ? 'completed': ""}`;
        liElement.dataset.id = item.id;
        liElement.dataset.priority = item.uuTien;

        // check priority

        let priority = 'Ưu tiên thấp';
        if(item.uuTien === 'high') priority = 'Ưu tiên cao'
        else if(item.uuTien === 'medium') priority = 'Ưu tiên trung bình';

        liElement.innerHTML = `
            <div class="task-checkbox-wrapper">
                <input type="checkbox" id="task-${item.id}" class="task-checkbox">
                <label for="task-${item.id}" class="checkbox-custom"></label>
            </div>
            <div class="task-content">
                <div class="task-title-row">
                    <h4 class="task-title">${item.ten}</h4>
                    <span class="badge-priority ${item.uuTien}">${priority}</span>
                </div>
                <p class="task-desc">${item.moTa}</p>
                <div class="task-meta">
                    <span class="meta-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="calendar" aria-hidden="true" class="lucide lucide-calendar"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> Hôm nay</span>
                    <span class="meta-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="hash" aria-hidden="true" class="lucide lucide-hash"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg> JS Nền tảng</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-action btn-edit" title="Sửa công việc" ${item.hoanThanh ? 'disabled' : ""}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="edit-3" aria-hidden="true" class="lucide lucide-edit-3"><path d="M13 21h8"></path><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path></svg></button>
                <button class="btn-action btn-delete" title="Xóa công việc"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="trash-2" aria-hidden="true" class="lucide lucide-trash-2"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
            </div>
        `;
        ulElement.appendChild(liElement);
    })
}
renderList();
// hiểu -> nhớ -> code 

function capNhatTienDo(){
    const total = danhSachCongViec.length;
    // lấy số lượng todo đã hoàn thành
    const completed = danhSachCongViec.filter(item => item.hoanThanh).length;
    const phanTram = total === 0 ? 0 : Math.round((completed / total) * 100);
    console.log(phanTram);

    const textPhanTram = document.querySelector('.stats-header strong');
    if(textPhanTram) textPhanTram.innerText = `${phanTram}%`;

    const descTienDo = document.querySelector('.stats-desc');
    if(descTienDo) descTienDo.innerText = `Hoàn thành ${completed} trong số ${total} công việc của bạn.`

    const processBar = document.querySelector('.progress-bar-fill');
    if(processBar){
        processBar.style.width = `${phanTram}%`
    }
}
capNhatTienDo();