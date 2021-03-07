//Tiempo demorado: 40 + 25 + 45 + 15 + 25 + 30 + 40 + 60+ 40 //Ya esta la aplicacion, funciona todo lo que es escribir en la hoja de calculo(falta nombres, no funciona metodo de slackbot.getUser )
//Tiempo extra: 120 // Pude sacar nombre de usuario y todos sus datos, tuve que hacer mi propia funcion para sacar los usuarios y lo que quiera. (Busque un monton en internet y no valia lo que encontraba :( )
// 60 + 40 + 30 + 30 Arreglo del codigo y mejoras para la hojas de calculo Ya crea nuevas hojas(funcion generar hoja del dia,no funciono cambiar el color), ademas de entender mejor la documentacion /  la implementacion de groups ya tiene para crear grupo, unir personas a un grupo y eliminar persona del grupo/ falta implementar clase groups en el bot. en las funciones del bot 
//60 Termine parte de ordenes, Con control de errores, arregle estilo de nueva hoja de calculo, termine el eliminar order, Limpie codigo 

const app = require('./app');
const bot = require('../Bot/bot.js')


app.listen(3000,()=>{
    console.log('Server Ready')
})







