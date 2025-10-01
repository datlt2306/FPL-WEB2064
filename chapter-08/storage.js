function saveStorage(key, value) {
    JSON.stringify(localStorage.setItem(key, value));
}
function getStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
export { saveStorage, getStorage };
