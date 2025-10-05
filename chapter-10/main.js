function cauHon() {
    return new Promise((resolve, reject) => {
        const isStatus = false;
        setTimeout(() => {
            if (!isStatus) return reject("Không đồng ý");
            return resolve("Gật đầu đồng ý");
        }, 3000);
    });
}

cauHon()
    .then((result) => {
        return result + "nois cụ thể luôn";
    })
    .then((result) => {
        console.log(result + "Về nhà");
    })
    .catch((error) => console.log(error));
