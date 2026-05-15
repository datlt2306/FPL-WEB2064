
// Demo 2: Hiển thị sản phẩm

const products = [
    {
        id: 1, name: "Laptop", price: 100
    }, // item 1
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
    data.forEach(function (item) {
        html += `<li>${item.name}-${item.price}</li>`;
    });
    // return
    return html;
}
const result = renderProducts(products);
document.querySelector('.listProduct').innerHTML = result;



