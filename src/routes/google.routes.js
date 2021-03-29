const {Router} = require('express');
const router = Router();

const{
    getSheet,
    showForm,
    saveOrder,
    } = require('../controllers/google.controller.js');

router.get('/', getSheet);
router.get('/form', showForm);
router.post('/form', saveOrder);

module.exports = router;
