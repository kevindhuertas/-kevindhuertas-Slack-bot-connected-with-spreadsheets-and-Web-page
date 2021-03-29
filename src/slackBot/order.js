const Bot = require('./bot.js');
const googleSheet = require('../spreadsheet');


const newOrder = (message, channel,userData,id) => {

    let restaurant = message[0];
    let order = message[1];
    let description = message[2];

    let userName = userData.real_name;
    let userId = userData.id;
    let userImg = userData.profile.image_original;
    //console.log(`${userName} ha pedido en: ${restaurant} con la orden: ${order} y descripcion: ${description}`)
    let body = {
        Id: userId,
        userImg: userImg,
        Name: userName,
        Restaurant: restaurant,
        Order: order,
        description: description
    }
    return googleSheet.saveOrder(body);
}

const deleteOrder = (userName) =>{
    return googleSheet.deleteOrder(userName);;
}

 module.exports = {
 "newOrder" : newOrder,
 deleteOrder:deleteOrder,
 }