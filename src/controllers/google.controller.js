//ESTO ES CONSTRUCTOR
let googleSheet = require('../spreadsheet');

//Get sheet from googleSpreadsheet
const getSheet = async (req,res)=>{
    registros = await googleSheet.accederGoogleSheet();
    res.render('index', { registros });
}

const showForm = (req,res)=>{
    res.render('form', {});
}


const saveOrder = async (req,res)=>{
    // ADD default image and descipction not undefined
    if (req.body.description == '') req.body.description = ' ';
    req.body.userImg = "http://eco-legal.com/wp-content/uploads/2018/09/default-profile.png"
    
    await googleSheet.saveOrder(req.body);
    res.redirect('/');
}

module.exports = {
    getSheet: getSheet,
    showForm: showForm,
    saveOrder: saveOrder,
}