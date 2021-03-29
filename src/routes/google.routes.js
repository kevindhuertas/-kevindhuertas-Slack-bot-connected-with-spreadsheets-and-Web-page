const {Router} = require('express');
const router = Router();

const{
    getSheet,
    saveOrder,
    } = require('../controllers/google.controller.js');

router.get('/', getSheet);
router.post('/form', saveOrder);

module.exports = router;
