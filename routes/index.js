const express = require("express");
const { agregarBanda, leerBandas, eliminarBanda, editarBanda } = require('../controllers/bands.controllers')
const router = express.Router();

router
    .route("/bandas")
    .post(agregarBanda) //Post añade
    .get(leerBandas) // Get consulta

router
    .route('/bandas/:id')
    .delete(eliminarBanda)
    .put(editarBanda)
module.exports = router;
