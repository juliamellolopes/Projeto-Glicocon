/*const express = require("express");
const {
  cadastrarUser,
  cadastrarHistorico,
} = require("../controllers/cadastroControllers");
const fazerLogin = require("../controllers/loginControllers");
const {
  historicoInsulina,
  ultimaGlicose,
} = require("../controllers/pesquisaControllers");
const editarUsuario = require("../controllers/editarControllers");

const router = express.Router();

router.use(express.json());

router.post("/cadastrarUser", cadastrarUser);
router.post("/cadastrar-historicos/:userId", cadastrarHistorico);
router.post("/login", fazerLogin);
router.get("/tabela-Historico/:userId", historicoInsulina);
router.put("/editar/:userID", editarUsuario);
router.get("/ultima-glicose/:userId", ultimaGlicose);

module.exports = router;*/
const express = require("express");
const cors = require("cors"); // Importe o pacote CORS

const {
  cadastrarUser,
  cadastrarHistorico,
} = require("../controllers/cadastroControllers");
const fazerLogin = require("../controllers/loginControllers");
const {
  historicoInsulina,
  ultimaGlicose,
} = require("../controllers/pesquisaControllers");
const editarUsuario = require("../controllers/editarControllers");

const router = express.Router();

// Aplicando o middleware de CORS
router.use(cors()); // Isso permitirá todas as origens. Em produção, você deve configurar isso adequadamente.

router.use(express.json());

router.post("/cadastrarUser", cadastrarUser);
router.post("/cadastrar-historicos/:userId", cadastrarHistorico);
router.post("/login", fazerLogin);
router.get("/tabela-Historico/:userId", historicoInsulina);
router.put("/editar/:userID", editarUsuario);
router.get("/ultima-glicose/:userId", ultimaGlicose);

module.exports = router;

