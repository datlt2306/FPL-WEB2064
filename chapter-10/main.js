// Ví dụ tiếp theo sử dụng callback
// Bước 1: Lấy danh sách sinh viên
// function getStudents(callback) {
//     console.log("Đang lấy danh sách sinh viên...");
//     setTimeout(() => {
//         const isStatus = true;
//         if (!isStatus) {
//             return callback(new Error("Lỗi khi lấy danh sách sinh viên"), null);
//         }
//         let students = ["An", "Bình", "Chi"];
//         callback(null, students);
//     }, 1000);
// }

// // Bước 2: Lấy điểm của 1 sinh viên
// function getScores(student, callback) {
//     console.log(`Đang lấy điểm cho ${student}...`);
//     setTimeout(() => {
//         if (!student) {
//             return callback(new Error("Không tìm thấy sinh viên"), null);
//         }
//         let scores = { toan: 8, ly: 7, hoa: 9 };
//         callback(scores, null);
//     }, 1000);
// }
// // Bước 3: Hiển thị kết quả
// function showResult(student, scores) {
//     console.log(`Kết quả của ${student}:`, scores);
// }
// // Sử dụng callback để xử lý tuần tự
// // callback in callback
// getStudents(function (error, students) {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     let firstStudent = students[0]; // Lấy sinh viên đầu tiên
//     getScores(firstStudent, function (error, scores) {
//         if (error) {
//             console.log(error);
//             return;
//         }
//     });
// });

// promise => promise lời hứa

// ke hoach cầu hôn
// Em có muốn lấy anh không?
// Chờ 3s
// nếu thành công bước 1: gật đầu
// Thực hiện bước 2: Gật đầu + 'Em đồng ý'
// Thực hiện bước 3: Gật đầu + 'Em đồng ý' + 'ôm' => Chốt đơn
// Không: Lắc đầu

function cauHon() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isStatus = false;
            if (!isStatus) {
                return reject("Lắc đầu");
            }
            resolve("Gật đầu");
        }, 3000);
    });
}
cauHon()
    .then((result) => {
        console.log("Nếu thành công bước 1: ", result);
        return result + " Em đồng ý";
    })
    .then((result) => {
        console.log("Nếu thành công bước 2: ", result);
        return result + " Ôm";
    })
    .then((result) => {
        console.log("Nếu thành công bước 3: ", result);
    })
    .catch((error) => {
        console.log("Nếu thất bại: ", error);
    })
    .then(() => {
        setTimeout(() => {
            console.log("Trả dép bố về");
        }, 2000);
    });

// GET | POST | PUT | DELETE

fetch("https://6867d5c8d5933161d709fda8.mockapi.io/products")
    .then((response) => {
        // response trả về 1 object
        // chuyển đổi thành json() => trả về 1 promise
        return response.json();
    })
    .then((data) => {
        // data trả về 1 mảng product
        const productList = document.getElementById("productList");
        productList.innerHTML = data.map((product) => `<li>${product.name}</li>`).join("");
    });
