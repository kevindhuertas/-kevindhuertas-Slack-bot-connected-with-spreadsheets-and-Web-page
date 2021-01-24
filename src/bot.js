const SlackBots = require('slackbots');

//TOKEN Bot (documentation: https://www.npmjs.com/package/slackbots)
const bot = new SlackBots({
    token: 'xoxb-807019776771-1692660898912-Ri0z4RdT1duZK0lawKO2VCeQ',
    name: 'Lunch' 
});


bot.on('open',()=> console.log('Bot is ready'));

bot.on('start', () => {
    bot.postMessageToChannel('general','Estoy vivo!!:cat:');
})

bot.on('message',(data)=>{''
    //Eliminamos mensajes que no queremos que se impriman en consola   
    if(data.type !== 'message' || data.subtype == 'bot_message' ||data.type =='user_typing'|| data.type == 'error'|| !data.text)  return;
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

    




/*     if ( == ''){
         console.log(data);
    }  */

})

