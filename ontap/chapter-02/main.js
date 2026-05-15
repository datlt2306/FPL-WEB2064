


class Person {
    constructor() {
        this.name = 'John';
        this.age = 20;
        this.city = 'New York';
    }
    getInfo() {
        console.log(this.name);
    }
}
const person = new Person();
person.getInfo();



// literal

const person = {
    "%": 'Dat',
    "age": 20,
    city: 'Ha Noi',
    getInfo: function () {
        console.log(this.name);
        console.log(this.age);
        console.log(this.city);
    }
}
console.log(person.city);
person.getInfo();


function person(name, age, city) {
    function getInfo() {
        console.log(name);
        console.log(age);
        console.log(city);
    }
    return getInfo;
}
person('Dat', 20, 'Ha Noi');