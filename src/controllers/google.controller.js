//ESTO ES CONSTRUCTOR
let googleSheet = require('../spreadsheet');



//Cuando abrimos la pagina web se va llamar a esta funcion de repuesta
const obtenerVideos = async (req,res)=>{
    registros = await googleSheet.accederGoogleSheet();
    //console.log(registros); //Me da info de la hoja cuando abro la pagina
    res.render('index', { registros });
}


const pintarForm = (req,res)=>{
    res.render('form', {});
}

const guardarPedido = (req,res)=>{
    googleSheet.guardarPedido(req.body); //Yo creo el metodo
    res.redirect('/');
}


module.exports = {
    obtenerVideos: obtenerVideos,
    pintarForm: pintarForm,
    guardarPedido: guardarPedido,
}