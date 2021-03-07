const Bot = require("./bot");
let googleSheet = require('../src/spreadsheet');


const newOrder = (message, channelId,userName) => {
    let restaurant = message[0];
    let order = message[1];
    let description = message[2];
    //console.log(`${userName} ha pedido en: ${restaurant} con la orden: ${order} y descripcion: ${description}`)
    let body = {
        Name: userName,
        Restaurant: restaurant,
        Order: order,
        description: description
    }
    //POST IN GOOGLE SHEET
    try{
        googleSheet.saveOrder(body);
        return true;
    }catch(error){return false}    
}



const deleteOrder = (userName) =>{
    try{
        if(googleSheet.deleteOrder(userName) == true){
        }else{return false}
        return true;
    }catch(error){return false}
}


 module.exports = {
 "newOrder" : newOrder,
 deleteOrder:deleteOrder,
 }