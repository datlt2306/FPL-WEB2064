function getUser(callback) {
    setTimeout(function(){
        callback({
                id: 1,
                name: "Nguyễn Văn An",
                email: "an@gmail.com"
        })
    }, 2000);
}
console.log("Bắt đầu lấy thông tin user");
getUser(function(user){
    console.log(user)
    console.log("Chương trình kết thúc");
});
// Bất đồng bộ
// function getUser(callback) {
//     setTimeout(() => {
//         const user = { id: 1, name: "An" };
//         callback(user);
//     }, 2000);
// }

// getUser((user) => {
//     console.log(user);
// });


// const showResult = (result) => {
//     console.log(`Tổng là ${result}`);
// }

// const totalPrice = (a, b, callback) => {
//     callback(a+b);
// }

// totalPrice(10, 20, showResult);