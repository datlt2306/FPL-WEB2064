
// Demo 2: Hiển thị sản phẩm

const products = [
    {
        id: 1, name: "Laptop", price: 100
    }, // item
    {
        id: 2, name: "Laptop 1", price: 200
    }, // item 2
    {
        id: 3, name: "Laptop 2", price: 300
    }
]
function renderProducts(data) {
    if (!Array.isArray(data)) {
        return "khong phai mang";
    }
    let html = "";
    // logic

    // for (let i = 0; i < data.length; i++) {
    //     html += `<li>${data[i].name}-${data[i].price}</li>`;
    // }

    // for (let i in data) {
    //     html += `<li>${data[i].name}-${data[i].price}</li>`;
    // }

    // for (let item of data) {
    //     html += `<li>${item.name}-${item.price}</li>`;
    // }

    data.forEach(function (item, i) {
        html += `<li>${item.name}-${item.price} - ${i}</li>`;
    });
    // return
    return html;
}
const result = renderProducts(products);
document.querySelector('.listProduct').innerHTML = result;



// map();
const numbers = [1, 2, 3, 4, 5];
const newNumber = numbers.map(function (number) {
    return number * 2;
});
console.log(numbers); // [1,2,3,4,5]
console.log(newNumber); // [2,4,6,8,10]

// FIlter
const friends = ['Kien', 'Nam', 'Minh', 'Thang'];
const newFriends = friends.filter(function (name) {
    return name !== 'Nam';
});
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
const itemFound = todos.find(function (item) {
    return item.id == 3;
});
console.log(itemFound);

// tính tổng giá sản phẩm trong giỏ hàng

const cartItem = [
    { id: 1, name: "Laptop", price: 100, quantity: 1 }, // item
    { id: 2, name: "Mouse", price: 200, quantity: 2 }, // item
    { id: 3, name: "Keyboard", price: 300, quantity: 1 } // item
];

const resultCart = cartItem.reduce(function (ketqua, item) {
    return ketqua + (item.price * item.quantity)
}, 0);

console.log("resultCart", resultCart);


// Tìm hiểu về vòng lặp: for, for..in, for..of, forEach
// Tìm hiểu: map, filter,find, reduce, some, every,
// Cho ít nhất 1 ví dụ về từng cái

//


