const { GoogleSpreadsheet} = require('google-spreadsheet');

const credenciales = require('./json/credencialesGooglesheet.json');

//Codigo del documento en drive
let googleId = "1DCY1bE5JaMIFGPZG0QZz3YHlEEbQbbJPAwhf43QZLto";


//funcion para acceder al documento
async function accederGoogleSheet(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo(); //Cargamos nuestro documento


    const sheet = documento.sheetsByIndex[0]; //Las hojas se ordenan como un array
    const registros = await sheet.getRows();

    //console.log(registros);   //Vemos los datos en nuestra hoja
    return registros;
}




async function guardarPedido(pObjeto) {
    //console.log(pObjeto); //ESTO ME DEVUELVE
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo();
    const sheet = documento.sheetsByIndex[0]; //Las hojas se ordenan como un array
    

    //Metodo para escribir en el documento
    await sheet.addRow(pObjeto);
}



module.exports = {
    accederGoogleSheet: accederGoogleSheet,
    guardarPedido:guardarPedido,
}