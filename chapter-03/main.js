const myFriends = ["Dat", "Thang", "Huy", "Hieu", "Long"];
//                 a
const listElement = document.getElementById("listElement");

let content = "";
// for
// for (let index = 0; index < myFriends.length; index++) {
//     content = content + `<li>${myFriends[index]}</li>`;
// }

// for...in
// for (let index in myFriends) {
//     content = content + `<li>${myFriends[index]}</li>`;
// }

// for...of
// for (let friend of myFriends) {
//     content = content + `<li>${friend}</li>`;
// }

// forEach
// syntax: array.forEach(function(item, index)){}
// myFriends.forEach((friend, index) => {
//     content = content + `<li>${friend} -  ${index}</li>`;
// });

// map, filter, find, reduce, every, some

// map
// syntax: array.map(function(item, index)){}
// const newFriends = myFriends
//     .map((friend) => {
//         return `<li>${friend}</li>`;
//     })
//     .join("");
// filter
const newFriends = myFriends
    .filter((friend) => friend !== "Huy")
    .map((friend) => `<li>${friend}</li>`)
    .join("");

console.log("Mảng cũ", myFriends);
console.log("Mảng mới", newFriends);
listElement.innerHTML = newFriends;
