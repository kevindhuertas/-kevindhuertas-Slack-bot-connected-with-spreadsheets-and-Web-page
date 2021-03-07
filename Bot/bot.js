const SlackBots = require('slackbots');
const order = require('./order');
const group = require('./groups');
let googleSheet = require('../src/spreadsheet');
//TOKEN Bot (documentation: https://www.npmjs.com/package/slackbots)
const bot = new SlackBots({
    token: 'xoxb-807019776771-1692660898912-Ri0z4RdT1duZK0lawKO2VCeQ',
    name: 'Lunch' 
});


let process = (msg,data, personaData) =>{
    //let option = msg.substring(0, msg.lastIndexOf("/")).toLowerCase();
    //let otroxd = msg.slice(0, msg.lastIndexOf("/"));
    let msgArray = msg.split('/'); //Todos los datos recibidos en un array 
    let option = orderArray.shift().toLowerCase().trim(); //Separamos la opcion y la borramos de order aRRAY
    options(option,msgArray,data.channel,data,personaData);
}



const options = (option, msg, channelId, data,personaData) =>{ 
    switch (option) {
        case "order":
                let Ord = order.newOrder(msg,channelId,personaData.real_name,data);
                if (Ord == true) {
                    bot.postMessage(channelId, "Tu pedido se ha realizado con exito"); 
                }else{bot.postMessage(channelId, "Eror with your order, try again o tell to support"); }
                break;

        case "delete my order":
                 //let personName = personaData.real_name;
                 if (order.deleteOrder(personaData.real_name) == true) {
                    bot.postMessage(channelId, "Your Order deleted :) "); 
                }else{bot.postMessage(channelId, "Error deleting your order, try again o tell to support"); }
                break;
                             
        case "create group":
                let groupCreator = personaData.real_name;
                let groupName = "holi";
                let destination = "kfc";
                //const holi = new group.Group({"groupName": groupName, "groupCreator":groupCreator, "destination" : destination});
                //console.log(holi)

                
        case "join group":
                //let groupCreator = personaData.real_name;

                "That group doesn't exist, please try again or find a new conga line to join 😫";
        case "see groups":
            "There are currently no active group. Try starting one! 😏";


        case "delete group":
            //"The conga line to %s doesn't exist so it can't be removed 😱";
                break
        case "help":
            bot.postMessage(channelId, `Hi! These are the thing that I can do:\n
            "*order* /Restaurant /order /description"\n
            "*delete my order*"\n
            "*see groups* /Restaurant /order /description"\n
            "*create group* /group name /destination /time(format HH:MM[AM/PM])"\n
            "*join group* /group name /order /description"\n)
            "*leave group* /group name /order /description"\n)
            "*delete group* /group name /order /description"\n`);
            break;

        case "about":
            bot.postMessage(channelId, "Lunch bot by **Kevin**");
            break;

        default:
            bot.postMessage(channelId, `I don't know "${option}"! if you want to see what I know, send me "*help*"`);
    }
}


bot.on('open',()=> console.log('Bot is ready'));
bot.on('start', function () {
    usuarios = bot.getUsers()._value.members;   //Conseguir todos los usuarios
    //console.log(usuarios);
    console.log("bot started con id: " + bot.self.id); 
    googleSheet.GenerateTodaySheet();
});



//WHEN SOMEONE SEND A MESSAGE TO THE BOT
bot.on('message', function (data) {
    let personaData = usuarios.find(Nombre => Nombre.id === data.user);

    // all ingoing events https://api.slack.com/rtm 
    //message from any channel
    if (data.type == "message" && data.text.startsWith('<@' + bot.self.id + '> ')) {
        var msg = data.text.replace('<@' + bot.self.id + '> ', '');
        data.text.replace('<@' + bot.self.id + '> ', '');
        //if(data.type !== 'message' || data.subtype == 'bot_message' || data.type =='user_typing'|| data.type == 'error'|| !data.text)  return;
        process(msg,data,personaData);
    }
    //direct message to bot
    else if (data.type == "message" && data.channel.startsWith('D') && !data.bot_id) {      
        process(data.text,data,personaData);
    }
});



module.exports = {
"bot": bot,
};
