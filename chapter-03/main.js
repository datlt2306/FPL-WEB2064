// Array

const todosListData = [
    "Chơi game",
    "Học Javascript",
    "Học React",
    "Học NodeJS",
    "Học MongoDB",
    "Học MySQL",
    "Học PostgreSQL",
    "Học Redis",
];
const listElement = document.getElementById("listElement");
let content = "";
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
todosListData.forEach(function (todo) {
    content += `<li>${todo}</li>`;
});
listElement.innerHTML = content;
