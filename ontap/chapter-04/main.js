
// function name ~ function declaration

declarationFunc(10, 20);
function declarationFunc(a, b) {
    console.log(a + b);
}

// function expression
const expressionFunc = function (a, b) {
    console.log(a + b);
}
expressionFunc(10, 20);

// arrow function

const arrowFunc = (a, b) => console.log(a + b);
arrowFunc(10, 20);

// Invoke function
((a, b) => console.log(a + b))(20, 10)

// map();
const numbers = [1, 2, 3, 4, 5];
// const newNumber = numbers.map(function(number) {
//     return number * 2;
// });
const newNumber = numbers.map(number => number * 2);
console.log(numbers); // [1,2,3,4,5]
console.log(newNumber); // [2,4,6,8,10]

// FIlter
const friends = ['Kien', 'Nam', 'Minh', 'Thang'];
const newFriends = friends.filter((name) => name !== 'Nam');
console.log(friends);
console.log(newFriends);



const todos = [
    {
        id: 1, name: "Reactjs"
    }, {
        id: 2, name: "PHP"
    },
    { id: 3, name: "HTML/CSS" }
];
const itemFound = todos.find((item) => item.id == 3);
console.log(itemFound);

// tính tổng giá sản phẩm trong giỏ hàng

const cartItem = [
    { id: 1, name: "Laptop", price: 100, quantity: 1 }, // item
    { id: 2, name: "Mouse", price: 200, quantity: 2 }, // item
    { id: 3, name: "Keyboard", price: 300, quantity: 1 } // item
];
const resultCart = cartItem.reduce((ketqua, item) => ketqua + (item.price * item.quantity), 0);
console.log("resultCart", resultCart);
