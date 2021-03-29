//documentation: https://www.npmjs.com/package/slackbots
const SlackBots = require('slackbots');
const order = require('./order');
const group = require('./groups');
let googleSheet = require('../spreadsheet');

//Token Bot(https://my.slack.com/services/new/bot)
const bot = new SlackBots({
    token: 'xoxb-807019776771-1692660898912-Ri0z4RdT1duZK0lawKO2VCeQ',
    name: 'Lunch' 
});
parties = []; //Array for Groups 


const process = (msg,userData,data) =>{
    let msgArray = msg.split('/');
    let option = msgArray.shift().toLowerCase().trim();
    msgArray.forEach((element,i) => msgArray[i] = element.trim());
    options(option,msgArray,data.channel,userData,data);
}


const options = async(option, msg, channelId,userData,data) =>{ 
    switch (option) {
        case "order":
                if(msg[0] == undefined || msg[1] == undefined){
                    if(msg[0] == undefined) bot.postMessage(channelId,"Restaurant is required");
                    else bot.postMessage(channelId,"Order is required!");
                    bot.postMessage(channelId,`Should be: "*order* /Restaurant /order /description(optional)"`);
                    break;
                }
                bot.postMessage(channelId, await order.newOrder(msg,channelId,userData)); 
                break;

        case "delete my order":
                bot.postMessage(channelId, await order.deleteOrder(userData.real_name));
                break;
                             
        case "create group":
                if(msg[0]==undefined || msg[1]== undefined || msg[2]==undefined){
                    bot.postMessage(channelId,`Fill all params to create the group\n"*create group* /group name /destination /time(format HH:MM[AM/PM])"`);
                    break;
                }
                let body = { 
                    groupCreatorId: userData.id,
                    groupCreator: userData.real_name,
                    groupName : msg[0],
                    destination : msg[1],
                    time : msg[2],
                } 
                parties.push(new group.Group(body));
                let groupSelected = parties.find(Nombre => Nombre.groupName === msg[0]);
                bot.postMessage(channelId,`You created the group!\n${groupSelected.getInfo()}`);
                break;
                
        case "join group":
                let groupToAddUser = await parties.find(Nombre => Nombre.groupName === msg[0]);
                if (groupToAddUser == undefined){
                    bot.postMessage(channelId,`The group *${msg[0]}* doesn't existn 😫`);
                    break;
                }
                if(groupToAddUser.SearchPasseger(userData.real_name)){
                    bot.postMessage(channelId,`You are already in the group!`);
                }else{
                    groupToAddUser.AddPassenger(userData.real_name);
                    bot.postMessage(channelId,`You are now in the group`);   
                }
                break;
                
                
        case "see groups":
                if(parties[0] == undefined)
                    bot.postMessage(channelId,"There are currently no active group. Try starting one! 😏");
                else{
                    await parties.forEach((element,i)=> bot.postMessage(channelId,`\n${i+1}: ${parties[i].getInfo()}`));
                    bot.postMessage(channelId,`To join a group: " *join group* /Name Group"`);
                }
                break;


        case "delete group":
                if(msg[0] == undefined){bot.postMessage(channelId,`Name group is requered`);break;}
                else if(parties[0] == undefined) bot.postMessage(channelId,"There are currently no active group. Try starting one! 😏");
                else if(await parties.find(name => name.groupName === msg[0]) != undefined){
                        let groupToDelete = await parties.find(Nombre => Nombre.groupName === msg[0]);
                        if(groupToDelete.groupCreator == userData.real_name ){
                            let groupToDelete = await parties.indexOf(Nombre => Nombre.groupName === msg[0]);
                                parties.splice(groupToDelete,1);
                                bot.postMessage(channelId,`Group Deleted!`);
                        }else bot.postMessage(channelId,`Your must be the creator of the group!`);
                }else bot.postMessage(channelId,`The group *${msg[0]}* doesn't exist so it can't be removed 😱`);
                break;

        case "help":
            let msgHelpOrder = `"*order* /Restaurant /order /description(optional)"\n"*delete my order*"`;
            let msgHelpGroups = `"*see groups*"\n"*create group* /group name /destination /time(format HH:MM[AM/PM])"\n"*join group* /group name"\n"*leave group* /group name"\n"*delete group* /group name(Your must be the creator)\n`;
            bot.postMessage(channelId, `Hi! These are the thing that I can do:\n${msgHelpOrder}\n${msgHelpGroups}`);
            break;

        case "leave group":
            if(msg[0] == undefined){bot.postMessage(channelId,`Name group is requered`);break;}
            
            if (await parties.find(name => name.groupName === msg[0]) != undefined) {
                let groupToleave = await parties.find(Nombre => Nombre.groupName === msg[0]);
                if(await groupToleave.LeavePassenger(userData.real_name) == true){
                    bot.postMessage(channelId,`You leave the group`);
                }else{bot.postMessage(channelId,`You are not in the group`);}
            }else bot.postMessage(channelId,`The group *${msg[0]}* doesn't exist!`);
            break;
                
        case "about":
            bot.postMessage(channelId, "Lunch bot by **Kevin**");
            break;

        default:
            bot.postMessage(channelId, `I don't know "${option}"! if you want to see what I know, send me "*help*"`);
    }
}



//WHEN BOT START
bot.on('open',()=> console.log('Bot is ready'));
bot.on('start', function () {
    usuarios = bot.getUsers()._value.members; //Get all users from slack
    googleSheet.GenerateTodaySheet();
});

//WHEN SOMEONE SEND A MESSAGE TO THE BOT
bot.on('message', function (data) {
    let userData = usuarios.find(Nombre => Nombre.id === data.user);
    
    //message from any channel with mention
    if (data.type == "message" && data.text.startsWith('<@' + bot.self.id + '> ')) {
        let msg = data.text.replace('<@' + bot.self.id + '> ', '');
        data.text.replace('<@' + bot.self.id + '> ', '');
        process(msg, userData, data);
    }

    //direct message to bot
    else if (data.type == "message" && data.channel.startsWith('D') && !data.bot_id) {      
        process(data.text, userData, data);
    }
});


module.exports = {
bot : bot,
parties: parties,
};
