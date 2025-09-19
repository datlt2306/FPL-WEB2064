const myFriends = ["Dat", "Thang", "Huy", "Hieu", "Long"];
const listElement = document.getElementById("listElement");

let content = "";
// for
for (let index = 0; index < myFriends.length; index++) {
    content = content + `<li>${myFriends[index]}</li>`;
}
listElement.innerHTML = content;
