var a = 10;
var a = 20;

console.log(a); // 20

let b = 10;
b = 20;
console.log(b); // ???

const c = 10;

console.log(c);

// when????
// cách đặt tên biến: danh từ

const myName = "Đạt"; // string
const myAge = 36; // number
const myStatus = true; // boolean
// what??
// How???
const myInfo = {
    name: "Đạt",
    age: 36,
    status: true,
};
const myFriends = [
    {
        name: "Huy",
        age: 36,
        status: true,
    },
    {
        name: "Hải",
        age: 36,
        status: true,
    },
];

// function
// decleared
function dongTien(money) {
    return money;
}
// excuted
console.log(`Ky 1: ${dongTien(20) - 2}`);
console.log(`Ky 1: ${dongTien(10) - 5}`);
