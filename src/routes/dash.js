var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");


router.get("/listarPersonagensFavoaritos", dashController.listarPersonagensFavoaritos);

module.exports = router;