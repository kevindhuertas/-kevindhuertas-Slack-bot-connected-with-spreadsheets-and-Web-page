const {Router} = require('express');
const router = Router();

const{
    obtenerVideos,
    pintarForm,
    guardarPedido,
    } = require('../controllers/google.controller.js');


router.get('/', obtenerVideos);
router.get('/form', pintarForm);
router.post('/form', guardarPedido);




module.exports = router;
