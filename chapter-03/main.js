// Array

const todosListData = [
    {
        id: 1,
        name: "Chơi game",
        completed: false,
        date: "23/07/2025",
    },
    {
        id: 2,
        name: "Học javascript nâng cao",
        completed: true,
        date: "18/9/2025",
    },
    {
        id: 3,
        name: "Học react",
        completed: false,
        date: "19/9/2025",
    },
    {
        id: 4,
        name: "Học node js",
        completed: false,
        date: "19/9/2025",
    },
    {
        id: 5,
        name: "Học mongo db",
        completed: false,
        date: "19/9/2025",
    },
];
const listElement = document.getElementById("todoList");
// let content = "";
// for
// syntax: for(variable, condition, increment/decrement){}
// for (let index = 0; index < todosListData.length; index++) {
//     content += `<li>${todosListData[index]}</li>`;
// }

// for ...in
// syntax: for(variable in array){}
// for (let index in todosListData) {
//     content += `<li>${todosListData[index]}</li>`;
// }

// for...of
// syntax: for(variable of array){}
// for (let todo of todosListData) {
//     content += `<li>${todo}</li>`;
// }

// forEach
// syntax: array.forEach(function(variable, index){})
// todosListData.forEach(function (todo) {
//     content += `<li>${todo}</li>`;
// });

// map() -> tạo mảng mới từ mảng cũ và biến đổi theo yêu cầu
// syntax: array.map(function(variable, index){})

// hiển thị
listElement.innerHTML = newTodosListData;
