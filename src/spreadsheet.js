const { GoogleSpreadsheet} = require('google-spreadsheet');

const credenciales = require('../json/credencialesGooglesheet.json');

//Codigo del documento en drive
let googleId = "1DCY1bE5JaMIFGPZG0QZz3YHlEEbQbbJPAwhf43QZLto";


//funcion para acceder al documento
async function accederGoogleSheet(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo(); //Cargamos nuestro documento


    const sheet = documento.sheetsByIndex[0]; //Las hojas se ordenan como un array
    const registros = await sheet.getRows();
    console.log(registros);
}

accederGoogleSheet();



module.exports = {
    accederGoogleSheet: accederGoogleSheet,
}