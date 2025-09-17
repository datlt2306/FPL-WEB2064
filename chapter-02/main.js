// ================================================
// function run() {
//     console.log("Đang chạy");
// }
// const profile = {
//     name: "Đạt",
//     run: function () {
//         console.log("Đang chạy");
//     },
//     children: {
//         run: function () {
//             console.log("Đang chạy");
//         },
//     },
// };
// console.log(profile.name);
// profile.children.run();

// ================================================

const a = 10;
const myName = "Dat";
const myInfo = {
    name: "Dat",
};

// function name
console.log(sum(10, 20));
function sum(a, b) {
    return a + b;
}

// function expression
const sum2 = function (a, b) {
    return a + b;
};
console.log(sum2(10, 20));

// arrow function
const sum3 = (a, b) => {
    return a + b;
};
console.log(sum3(10, 20));
