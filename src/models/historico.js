const Sequelize = require("sequelize");
const Usuario = require("./usuario");
const database = require("../config/db");

const Historico = database.define("historico", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  glicose: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  insulina: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  data_hora: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

Usuario.hasMany(Historico);
Historico.belongsTo(Usuario);

module.exports = Historico;
