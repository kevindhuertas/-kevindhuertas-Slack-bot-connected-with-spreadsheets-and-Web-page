const Bot = require("./bot");
let googleSheet = require('../src/spreadsheet');
/*

bot.on('message-',(data)=>{''
    //Eliminamos mensajes que no queremos que se impriman en consola   
    if(data.type !== 'message' || data.subtype == 'bot_message' || data.type =='user_typing'|| data.type == 'error'|| !data.text)  return;
    //console.log(data.text)
    
    
    const Fullmessage = data.text.split(" "); //CREA EL ARRAY con cada palabra
    const person = Fullmessage.splice(0, 1)[0];
    
    //parametros de mensaje ... (restaurante, plato, descripcion)
    const message = Fullmessage; 
    let restaurant = message[0];
    let dish = message[1];
    message.splice(0,1)
    let description = message.join(" ");
    
    console.log(`El restaurante es: ${restaurant}, pedir plato ${dish} pero con esta descripcion: ${description}`)
    
})

 */


 const individualOrder = () => {
 console.log("Estamos en la funcion de individual Order ")


 };


 
const newOrder = (message, channelId,personName) => {

    let restaurant = message[0];
    let order = message[1];
    let description = message[2];
    console.log(`${personName} ha pedido en: ${restaurant} con la orden: ${order} y descripcion: ${description}`)
    
    let body = {
        Nombre: personName,
        Restaurante: restaurant,
        Pedido: order,
        descripcion: description
    }
    //POST IN GOOGLE SHEET
    googleSheet.guardarPedido(body);
}


 module.exports = {
 "individualOrder" : individualOrder,
 "newOrder" : newOrder,
 }