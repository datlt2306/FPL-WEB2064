// destructuring => phá hủy  | bóc tách

// array
const [first, second] = [10, 20];
// object
const student = {
    name: "Dat",
    age: 38,
    children: {
        name: "Ken",
        age: 13,
    }
};
// const children = student.children;
const { children } = student;
console.log(children.name);


function showInfo({ age, children: { age: childrenAge } }) {
    console.log(age, childrenAge);
}
showInfo(student);



// Call back function

// function displayer(some) {
//     document.getElementById('result').innerHTML = some
// }
// function sum(a, b) {
//     return a + b
// }
// const result = sum(10, 20);
// displayer(result);

// function displayer(some) {
//     document.getElementById('result').innerHTML = some
// }
// function sum(a, b) {
//     displayer(a + b);
// }
// sum(10, 20);



function displayer(some) {
    document.getElementById('result').innerHTML = some
}
function sum(a, b, callback) {
    callback(a + b);
}
sum(10, 20, displayer);



const show = () => {
    console.log(123);
}

const friends = ["Ken", "Bao", "Tuan", "Dat"];

const showFriend = friend => {
    return `Bạn ${friend}`
}
friends.map(showFriend);

// Bất đồng bộ

// 1. Có 1 div có id productList
console.log(1);
// 2. Gọi lên server lấy dữ liệu 
setTimeout(() => {
    console.log(2)
}, 2000)
// 3. Hiển thị ra div có id productList
console.log(3);




