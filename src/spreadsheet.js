const { GoogleSpreadsheet} = require('google-spreadsheet');
const credenciales = require('./json/credencialesGooglesheet.json');
const date = new Date();
const months = ['Jan','Feb','Marc','Apri','May','June','July','Aug','Sep','Oct','Nov','Dec']
//Codigo del documento en drive
let googleId = "1DCY1bE5JaMIFGPZG0QZz3YHlEEbQbbJPAwhf43QZLto";



//funcion para acceder al documento PARA PAGINA WEB
async function accederGoogleSheet(){
    let today = `${months[date.getMonth()]}-${date.getDate()}`;
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo(); //Cargamos nuestro documento
    //const sheet = documento.sheetsByIndex[0]; //Las hojas se ordenan como un array
    const sheet = documento.sheetsByTitle[today];
    const registros = await sheet.getRows();
    //console.log(registros);
    return registros
}



async function GenerateTodaySheet(){
    let today = `${months[date.getMonth()]}-${date.getDate()}`;
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo();

    if(documento.sheetsByTitle[today] == undefined){
        await documento.addSheet({ title: today,headerValues: ['Id','Name', 'Restaurant','Order','description','','','','Groups','Destination','Members','Id members'] });
        const sheet = documento.sheetsByTitle[today];
        await sheet.loadCells('A1:K1');
        //PINTA CELDAS
        const abs = ["A",'B','C','D','E','F','G','H','I','J','K','I']
        for (let i= 0; i< 11; i++) {
            const cell = sheet.getCellByA1(`${abs[i]}${1}`);
            if(i<=4){cell.backgroundColor = { red: 1, green: 0.6 }}
            if(i>=8 & i<=13){cell.backgroundColor = {red: 0.6431373, green: 0.7607843, blue: 0.95686275 }}
            cell.textFormat = { bold: true };
        }
        await sheet.saveUpdatedCells();
        console.log("Hoja GENERADA para el dia de hoy");
    }else{  
        //onst sheet = documento.sheetsByTitle[today];
        console.log("Hoja de hoy YA estaba GENERADA");
    }
}


//funcion para acceder al documento PARA PAGINA WEB
/* async function accederGoogleSheet(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo(); //Cargamos nuestro documento
    const sheet = documento.sheetsByIndex[0]; //Las hojas se ordenan como un array
    const registros = await sheet.getRows();
    return registros;
}
 */





async function saveOrder(pObjeto) {
    let today = `${months[date.getMonth()]}-${date.getDate()}`;
    //console.log(pObjeto); //ESTO ME DEVUELVE
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo();

    if(documento.sheetsByTitle[today] == undefined){
        documento.addSheet({ title: today })
        const sheet = documento.sheetsByTitle[today];
    }else{
        const sheet = documento.sheetsByTitle[today]; //Las hojas se ordenan como un array
    }

    //Metodo para escribir en el documento
    await sheet.addRow(pObjeto);
}



async function deleteOrder(userNameToDelete) {
    let today = `${months[date.getMonth()]}-${date.getDate()}`;
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo();
    const sheet = documento.sheetsByTitle[today];
    const registros = await sheet.getRows();

    //let rowToDelete = registros.find(DelUser => DelUser.Name === userNameToDelete);
    //await rows[rowToDelete._rowNumber].delete() == undefined;
    let rowToDelete = registros.find(DelUser => DelUser.Name === userNameToDelete)
    if(rowToDelete == undefined){
        return false
    }else{
        try{
            await rows[rowToDelete._rowNumber].delete();
            return true;
        }catch(e){return false}
        }
}



/* async function saveOrder(pObjeto) {
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales); //Nos da acceso a nuestra cuenta
    await documento.loadInfo();
    const sheet = documento.sheetsByIndex[0]; //Las hojas se ordenan como un array
    await sheet.addRow(pObjeto);
} */


async function Groups(pObjeto) {
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
    saveOrder:saveOrder,
    deleteOrder:deleteOrder,
    GenerateTodaySheet:GenerateTodaySheet,
}
