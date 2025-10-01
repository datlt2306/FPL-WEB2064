const data = [];
const a = 30;
const b = 20;

const button = document.getElementById("button");
const ketQua = document.getElementById("ketQua");
const hienthi = document.getElementById("hienthi");
const button2 = document.getElementById("button2");

button.addEventListener("click", () => {
    ketQua.innerHTML = a + b;
    // lưu dữ liệu vào localStorage
    localStorage.setItem("ketQua", ketQua.innerHTML);
});

// xóa dữ liệu từ localStorage
button2.addEventListener("click", () => {
    localStorage.removeItem("ketQua");
});

// lấy dữ liệu từ localStorage
const ketQuaLocalStorage = JSON.parse(localStorage.getItem("ketQua"));
hienthi.innerHTML = ketQuaLocalStorage;
