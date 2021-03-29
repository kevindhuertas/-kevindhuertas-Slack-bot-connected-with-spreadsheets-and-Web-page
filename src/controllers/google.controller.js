//ESTO ES CONSTRUCTOR
let googleSheet = require('../spreadsheet');
let Bot = require('../slackBot/bot');

const getSheet = async (req,res)=>{
    registros = await googleSheet.getGoogleSheetRecord();
    res.render('index', { registros, Bot});
}

const saveOrder = async (req,res)=>{
    // ADD default image and descipction not undefined
    if (req.body.description == '') req.body.description = ' ';
    req.body.userImg = "https://capacidades.org/wp-content/uploads/2019/03/default-user.png";
    await googleSheet.saveOrder(req.body);
    res.redirect('/');
}

module.exports = {
    getSheet: getSheet,
    saveOrder: saveOrder,
}