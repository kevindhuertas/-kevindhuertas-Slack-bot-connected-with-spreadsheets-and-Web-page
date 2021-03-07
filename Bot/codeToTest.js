const groups = require('./groups');
let group = groups.Group;

console.log("Inicio del programa");
let parties = [];

for (let i = 0; i < 4; ++i) {
    console.log("Inicio del bucle"); 
    Group = new group(`fc parties ${i}`, "kfc","10:00","2:00","CUMPLE KEVIN");
    parties.push(Group);
    console.log("fin del bucle"); 
}

console.log(parties);
for (let i = 0; i < 4; ++i) {
    let element = parties[i].name;
    console.log(element);   
}

for (let i = 0; i < 4; ++i) {
    let person = `Danik  ${i}`
    parties[i].AddPassenger(person);

    let sePerson = `Kevin ${i}`
    parties[i].AddPassenger(sePerson);
}

parties[1].LeaveCongaCommand('Kevin ')
parties[1].AddPassenger('Kevin 1')
console.log(parties);


const date = new Date();


let today = `${date.getMonth()}-${date.getDate()}`;
console.log(today);
