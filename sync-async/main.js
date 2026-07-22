// function getUser(callback) {
//     setTimeout(() => {
//         const user = { id: 1, name: "An" };
//         callback(user);
//     }, 2000);
// }

// function getOrders(userId, callback) {
//     setTimeout(() => {
//         const orders = [
//             { id: 101, userId: userId },
//             { id: 102, userId: userId }
//         ];

//         callback(orders);
//     }, 2000);
// }

// function getOrderDetail(orderId, callback) {
//     setTimeout(() => {
//         const orderDetail = {
//             id: orderId,
//             product: "Laptop",
//             price: 20000000
//         };

//         callback(orderDetail);
//     }, 2000);
// }
// // callback hell
// getUser((user) => {
//     console.log("User:", user); // { id: 1, name: "An" };
//     getOrders(user.id, (orders) => {
//         console.log("Orders:", orders);
//         getOrderDetail(orders[0].id, (orderDetail) => {
//             console.log("Order Detail:", orderDetail);
//         });
//     });
// });

// promise 

// const cauHon = () => {
//     return new Promise((resolve, reject) => {
//         const status = true;
//         if(!status) reject('Lắc đầu');
//         setTimeout(function(){
//             resolve('Gật đầu');
//         }, 3000)
//     });
// }
// cauHon()
// .then(result => {
//     console.log(result);
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(result + 'xxx');
//         }, 3000);
//     });
// })
// .then(result => console.log(result))
// .catch(error => console.log(error))


// api

fetch(`http://letrongdat.com/products`)
    .then(result => result.json())
    .then(data => {
        console.log('Mảng cũ', data);
        console.log('Mảng mới', data.map(item => `<div>${item.name}</div>`).join(''));
       document.querySelector('#products').innerHTML = data.map(item => `<div>${item.name}</div>`).join('')
    })
    .catch(error => console.log(error))
