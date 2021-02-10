const SlackBots = require('slackbots');
const order = require('./order');
//TOKEN Bot (documentation: https://www.npmjs.com/package/slackbots)
const bot = new SlackBots({
    token: 'xoxb-807019776771-1692660898912-Ri0z4RdT1duZK0lawKO2VCeQ',
    name: 'Lunch' 
});


let process = (msg,data, personaData) =>{

    
    //let option = msg.substring(0, msg.lastIndexOf("/")).toLowerCase();
    //let otroxd = msg.slice(0, msg.lastIndexOf("/"));
    let orderArray = msg.split('/'); //Todos los datos recibidos en un array 
    let option = orderArray.shift().toLowerCase().trim(); //Separamos la opcion y la borramos de order aRRAY
    
    options(option,orderArray,data.channel,data,personaData);
}



const options = (option, msg, channelId, data,personaData) =>{ 
    switch (option) {
        case "order":
                let personName = personaData.real_name;
                order.newOrder(msg,channelId,personName,data);
                bot.postMessage(channelId, "Tu pedido se ha realizado con exito"); 
                break;

        case "help":
            bot.postMessage(channelId, `Hi! These are the thing that I can do:\n
            "*order* /Restaurant /order /description"\n
            "*see groups* /Restaurant /order /description"\n
            "*join group* /Restaurant /order /description"\n
            "*create group* /Restaurant /order /description"\n`);
            break;

        case "about":
            bot.postMessage(channelId, "Lunch bot by **KevinDev**");
            break;

        default:
            bot.postMessage(channelId, `I don't know "${option}"! if you want to see what I know, send me "*help*"`);
    }
}




bot.on('open',()=> console.log('Bot is ready'));

bot.on('start', function () {
    usuarios = bot.getUsers()._value.members;   //Conseguir todos los usuarios
    console.log("bot started con id: " + bot.self.id); 
});




//WHEN SOMEONE SEND A MESSAGE TO THE BOT
bot.on('message', function (data) {
    // all ingoing events https://api.slack.com/rtm 
    if (data.type == "message" && data.text.startsWith('<@' + bot.self.id + '> ')) {
        var msg = data.text.replace('<@' + bot.self.id + '> ', '');
        data.text.replace('<@' + bot.self.id + '> ', '');
        //if(data.type !== 'message' || data.subtype == 'bot_message' || data.type =='user_typing'|| data.type == 'error'|| !data.text)  return;
        process(msg,data);
    }

    //direct message to bot
    if (data.type == "message" && data.channel.startsWith('D') && !data.bot_id) {      
        let personaData = usuarios.find(Nombre => Nombre.id === data.user);   
        process(data.text,data,personaData);
    }

});







module.exports = {
"bot": bot,
};



let getDatos=(datos)=>{
    let cadenaSplit = cadenaza.split(' ');
    let cadenaFinal = cadenaSplit.join(',');
    return cadenaFinal;
};
