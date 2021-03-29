//Tiempo demorado: 40 + 25 + 45 + 15 + 25 + 30 + 40 + 60+ 40 //Ya esta la aplicacion, funciona todo lo que es escribir en la hoja de calculo(falta nombres, no funciona metodo de slackbot.getUser )
//Tiempo extra: 120 (de eso manual 45)// Pude sacar nombre de usuario y todos sus datos, tuve que hacer mi propia funcion para sacar los usuarios y lo que quiera. (Busque un monton en internet y no valia lo que encontraba :( )
// 60 + 40 + 30 + 30 Arreglo del codigo y mejoras para la hojas de calculo Ya crea nuevas hojas(funcion generar hoja del dia,no funciono cambiar el color), ademas de entender mejor la documentacion /  la implementacion de groups ya tiene para crear grupo, unir personas a un grupo y eliminar persona del grupo/ falta implementar clase groups en el bot. en las funciones del bot 
//60 Termine parte de ordenes, Con control de errores, arregle estilo de nueva hoja de calculo, termine el eliminar order, Limpie codigo 
//60 prepare codigo, hice algunas validadciones como que sea obligatorio poner restaurante, mande foto de usuario a googlesheet


//-----------CODIGO TEST DE GRUPOS ---------------
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

/* ----------------- GROUP TEST 2 ---------*/
const groups = require('./slackBot/groups');


const listGroups =[];
let groupCreator = "nombre de la persona";
let groupName = "holi";
let destination = "kfc";
const holi = new groups.Group({"groupName": groupName, "groupCreator":groupCreator, "destination" : destination});



for (let i = 0; i < 3; i++) {


    let groupCreator = "Daniel ";
    let groupName = `nombre ${i}`;
    let destination = "kfc";
    const group = new groups.Group({"groupName": groupName, "groupCreator":groupCreator, "destination" : destination});
    listGroups.push(group)
    
    group.AddPassenger(`persona extra${i+26}`)
    
}
for (let i = 0; i < 3; i++) {
    let nameG = listGroups[i].groupName;
    let personas = listGroups[i].passengers;
    console.log(`En ${nameG} esta ${personas}`);    
}
