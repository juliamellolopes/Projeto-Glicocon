/*(async () => {
  const database = require("./src/config/db");
  const Usuario = require("./src/models/usuario");
  const Historico = require("./src/models/historico");
  await database.sync();
  const router = require("./src/routes/index");
})();*/
const express = require('express');
const cors = require('cors');
const database = require("./src/config/db");
const Usuario = require("./src/models/usuario");
const Historico = require("./src/models/historico");

(async () => {
  await database.sync();

  const app = express();

  app.use(cors());

  // Outras configurações, como middlewares, podem vir aqui

  const router = require("./src/routes/index");
  app.use(router);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();

