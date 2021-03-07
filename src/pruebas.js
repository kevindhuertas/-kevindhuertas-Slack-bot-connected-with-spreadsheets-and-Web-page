const groups = require('../Bot/groups');


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
