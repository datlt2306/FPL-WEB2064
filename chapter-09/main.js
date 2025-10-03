// function display(name) {
//     console.log(`Xin chào ${name}`);
// }
// function showName(name, callback) {
//     callback(name);
// }
// showName("Đạt", display);

// /**
//  * 	1.	Viết hàm calculate(a, b, callback):
// 	Nhận vào 2 số a, b.
// 	Nhận vào một callback để quyết định phép tính (cộng, trừ, nhân, chia).
// 	Trả về kết quả phép tính.
// 	2.	Thử gọi với 2 số: 10 và 5.
// 	•	Callback cộng → ra 15
// 	•	Callback trừ → ra 5
// 	•	Callback nhân → ra 50
// 	•	Callback chia → ra 2
//  */

// function tinhTong(a, b) {
//     console.log(a + b);
// }
// function tinhHieu(a, b) {
//     console.log(a - b);
// }
// function tinhNhan(a, b) {
//     console.log(a * b);
// }
// function tinhChia(a, b) {
//     console.log(a / b);
// }
// function calculate(a, b, callback) {
//     callback(a, b);
// }

// calculate(10, 5, tinhTong);
// calculate(50, 15, tinhHieu);
// calculate(13, 13, tinhNhan);
// calculate(10, 5, tinhChia);

// console.log("Có 1 khu vực để hiển thị danh sách sản phẩm");
// setTimeout(() => {
//     console.log("Truy vấn cơ sở liệu thành công và trả về dữ liệu");
// }, 1000);
// console.log("Hiển thị danh sách sản phẩm lên giao diện");

// function getData() {
//     console.log("Đang tải dữ liệu...");

//     setTimeout(function () {
//         let data = "Danh sách sinh viên";
//         console.log("Dữ liệu bên trong setTimeout:", data);
//         return data; // ❌ return này KHÔNG hoạt động như mong muốn
//     }, 2000);
// }
// let result = getData();
// console.log("Dữ liệu nhận được:", result);

function getData(callback) {
    console.log("Đang tải dữ liệu...");
    // Giả lập chờ 2 giây
    setTimeout(function () {
        let data = "Danh sách sinh viên";
        callback(data); // gọi callback khi đã có dữ liệu
    }, 2000);
}
function showData(result) {
    console.log("Dữ liệu nhận được:", result);
}
getData(showData);

// Ví dụ tiếp theo sử dụng callback
// Bước 1: Lấy danh sách sinh viên
function getStudents(callback) {
    console.log("Đang lấy danh sách sinh viên...");
    setTimeout(() => {
        let students = ["An", "Bình", "Chi"];
        callback(students);
    }, 1000);
}

// Bước 2: Lấy điểm của 1 sinh viên
function getScores(student, callback) {
    console.log(`Đang lấy điểm cho ${student}...`);
    setTimeout(() => {
        let scores = { toan: 8, ly: 7, hoa: 9 };
        callback(scores);
    }, 1000);
}

// Bước 3: Hiển thị kết quả
function showResult(student, scores) {
    console.log(`Kết quả của ${student}:`, scores);
}

// Sử dụng callback để xử lý tuần tự
getStudents(function (students) {
    let firstStudent = students[0]; // Lấy sinh viên đầu tiên
    getScores(firstStudent, function (scores) {
        showResult(firstStudent, scores);
    });
});
