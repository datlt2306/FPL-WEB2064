// function cauHon() {
//     return new Promise((resolve, reject) => {
//         const isStatus = false;
//         setTimeout(() => {
//             if (!isStatus) return reject("Không đồng ý");
//             return resolve("Gật đầu đồng ý");
//         }, 3000);
//     });
// }

// cauHon()
//     .then((result) => {
//         return result + "nois cụ thể luôn";
//     })
//     .then((result) => {
//         console.log(result + "Về nhà");
//     })
//     .catch((error) => console.log(error));

// function loadScript(src) {
//     return new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.onload = () => resolve(script);
//         script.onerror = () => reject("Lỗi tải script");
//         document.head.append(script);
//     });
// }
// loadScript("https://cdn.tailwindcss.com")
//     .then((result) => {
//         console.log(`Script 1 đã được tải: ${result.src}`);
//         return 123;
//     })
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error));

// Fetch API
fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
        const todosList = document.getElementById("todos");
        const result = data.map((item) => `<li>${item.title}</li>`).join("");
        todosList.innerHTML = result;
    });
