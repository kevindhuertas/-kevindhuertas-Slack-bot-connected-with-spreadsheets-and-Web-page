const SlackBots = require('slackbots');
const order = require('./order');
const group = require('./groups');
let googleSheet = require('../spreadsheet');
//TOKEN Bot (documentation: https://www.npmjs.com/package/slackbots)
const bot = new SlackBots({
    token: 'xoxb-807019776771-1692660898912-Ri0z4RdT1duZK0lawKO2VCeQ',
    name: 'Lunch' 
});


let process = (msg,data, personaData) =>{
    //let option = msg.substring(0, msg.lastIndexOf("/")).toLowerCase();
    //let otroxd = msg.slice(0, msg.lastIndexOf("/"));
    let msgArray = msg.split('/'); //Todos los datos recibidos en un array 
    let option = msgArray.shift().toLowerCase().trim(); //Separamos la opcion y la borramos de order aRRAY
    //console.log(personaData);
    options(option,msgArray,data.channel,data,personaData);
}

let sendBotessage = (chId,ms)=>{
    console.log('si es funcion')
    bot.postMessage(chId,ms);
}

const options = async(option, msg, channelId, data,personaData) =>{ 
    switch (option) {
        case "order":
                if(msg[0] == undefined || msg[1] == undefined){
                    if(msg[0] == undefined) bot.postMessage(channelId,"Restaurant is obligatorio!");
                    else bot.postMessage(channelId,"order is obligatorio!");
                    bot.postMessage(channelId,`It should be: "*order* /Restaurant /order /description(optional)"`);
                    break;
                }
                //order.newOrder(msg,channelId,personaData.real_name,data).then(messa =>{console.log(messa)}).catch(err =>{console.log("problemasss")});
                bot.postMessage(channelId,await order.newOrder(msg,channelId,personaData)); //Hacer funcion Async y dentro de la funcion mandar un return resolve/reject con un mensaje
                break

        case "delete my order":
                 //let personName = personaData.real_name;
              /*    if (order.deleteOrder(personaData.real_name) == true) {
                    bot.postMessage(channelId, "Your Order deleted :) "); 
                }else{bot.postMessage(channelId, "Error deleting your order, try again o tell to support"); }
                 */
                let res = await order.deleteOrder(personaData.real_name)
                bot.postMessage(channelId, res);
                break;
                             
        case "create group":
                //let groupCreator = personaData.real_name;
      /*           try{
                    if (parties = undefined) console.log("")
                    }catch(e){
                        
                    }
 */
                let groupCreator = "Nombre del creador";
                let groupName = "Todo Sushi";
                let destination = "Park";
                let hora = "12:00 PM"
                let body = { 
                    groupCreator: groupCreator,
                    groupName : groupName,
                    destination : destination,
                    time : hora,
                } 
                let groupClass = group.Group;
                parties.push(new groupClass(body));
                let groupSelected = parties.find(Nombre => Nombre.groupName === groupName);
                console.log(parties);
                let gMsg = groupSelected.getInfo;
                bot.postMessage(channelId,`Se ha creado el grupo: ${gMsg} `);
                break;

                //const holi = new group.Group({"groupName": groupName, "groupCreator":groupCreator, "destination" : destination});
                //console.log(holi)

                
        case "join group":
                //let groupCreator = personaData.real_name;
                {
                let personName = personaData.real_name;
                let groupName = "Todo Sushi";
                let groupSelected = parties.find(Nombre => Nombre.groupName === groupName);
                if (groupSelected == undefined){
                    bot.postMessage(channelId,"That group doesn't exist, please try again or find a new conga line to join 😫");
                    break;
                }
                groupSelected.AddPassenger(personName);
                bot.postMessage(channelId,`Se te añadido al grupo`);
                break;
                }
                
        case "see groups":
                if(parties == undefined)
                    bot.postMessage(channelId,"There are currently no active group. Try starting one! 😏");
                else{
                    bot.postMessage(channelId,`These groups exist:`);
                    for (let i = 0; i < parties.length; i++) {
                        const  groupInfo= parties[i].getInfo;
                        bot.postMessage(channelId,`\n ${groupInfo}`);
                    }
                    bot.postMessage(channelId,`To join a group: " *join group* /Name Group"`);
                }



        case "delete group":
                
                if(parties == undefined)
                bot.postMessage(channelId,"There are currently no active group. Try starting one! 😏");
                else{
                    let groupName = "Todo Sushi";
                    let groupSelected = parties.find(Nombre => Nombre.groupName === groupName);
                    function removeItem(arr, item) {
                        let i  = arr.indexOf(item);
                        arr.splice(i,1);
                    }
                    removeItem(parties,groupSelected);

                }
            //"The conga line to %s doesn't exist so it can't be removed 😱";
                break
        case "help":
            let msgHelpOrder = `"*order* /Restaurant /order /description(optional)"\n"*delete my order*"`;
            let msgHelpGroups = `"*see groups* /Restaurant /order /description"\n
                                "*create group* /group name /destination /time(format HH:MM[AM/PM])"\n
                                "*join group* /group name /order /description"\n
                                "*leave group* /group name /order /description"\n
                                "*delete group* /group name /order /description"\n`;

            bot.postMessage(channelId, `Hi! These are the thing that I can do:\n${msgHelpOrder}`
            
            );
            break;
        case "test":
            console.log(parties);
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
    parties = [];
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
"sendBotessage": sendBotessage,
};
