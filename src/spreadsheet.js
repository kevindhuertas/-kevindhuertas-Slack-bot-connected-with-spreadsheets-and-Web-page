const { GoogleSpreadsheet} = require('google-spreadsheet');
const credentials = require('./json/credentialsGooglesheet.json');

const date = new Date();
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const today=()=> {return`${months[date.getMonth()]}-${date.getDate()}`};

//Sheet link code from: https://docs.google.com/spreadsheets/d/1DCY1bE5JaMIFGPZG0QZz3YHlEEbQbbJPAwhf43QZLto
let googleId = "1DCY1bE5JaMIFGPZG0QZz3YHlEEbQbbJPAwhf43QZLto";



async function accessGoogleSheet() {
    const document = new GoogleSpreadsheet(googleId);
    await document.useServiceAccountAuth(credentials); //Nos da acceso a nuestra cuenta
    await document.loadInfo();
    return document;
}

async function getGoogleSheetRecord(){
    try{ 
        const document= await accessGoogleSheet();
        const sheet = document.sheetsByTitle[today()];
        const Record = await sheet.getRows();
        return Record
    }catch{
        const Record = undefined;
        return Record
    }
}


async function GenerateTodaySheet(){
    try {
        const document= await accessGoogleSheet();
        
        if(document.sheetsByTitle[today()] == undefined){
            await document.addSheet({ title: today(),headerValues: ['Id','Name', 'Restaurant','Order','description','','','','','', 'userImg'] });
            const sheet = document.sheetsByTitle[today()];
            await sheet.loadCells('A1:K1');
            //Color Cells
            let abs = ["A",'B','C','D','E','F','G','H','I','J','K','I']
            for (let i= 0; i< 11; i++) {
                const cell = sheet.getCellByA1(`${abs[i]}${1}`);
                if(i<=4){cell.backgroundColor = { red: 1, green: 0.6 }}
                cell.textFormat = { bold: true };
            }
            await sheet.saveUpdatedCells();

            console.log("New Sheet for today");
        }else console.log("Today's sheet is already created");
    } catch (e) {
       console.log("Error generating today sheet");
    }
}


async function saveOrder(pObjeto) {
    try{
        const document= await accessGoogleSheet();
        const sheet = document.sheetsByTitle[today()]; //Las hojas se ordenan como un array
        await sheet.addRow(pObjeto);
        return "Order placed!"
    }catch(e){
        return "Error placing the order!"}
    }



async function deleteOrder(userNameToDelete) {
    try{
        const document= await accessGoogleSheet();
        const sheet = document.sheetsByTitle[today()];
        const rows = await sheet.getRows();
        let rowToDelete =  await rows.find(DelUser => DelUser.Name === userNameToDelete)
        await rows[rowToDelete._rowNumber].delete();        
        return "Order removed!";
    }catch(e){
        console.log(e);
        return "Error while deleting :(";}     
}


async function Groups(pObjeto) {
    const document= await accessGoogleSheet();
    const sheet = document.sheetsByIndex[0];
    await sheet.addRow(pObjeto);
}


module.exports = {
    getGoogleSheetRecord: getGoogleSheetRecord,
    saveOrder:saveOrder,
    deleteOrder:deleteOrder,
    GenerateTodaySheet:GenerateTodaySheet,
}
