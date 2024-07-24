const express = require("express");
const Historico = require("../models/historico");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

async function historicoInsulina(req, res) {
  const { userId } = req.params;
  const { data } = req.query; // Recebe a data como parâmetro de consulta

  try {
    let dataAtual = new Date();
    let dataLimite;

    // Verifica se foi fornecida uma data pelo front-end
    if (data) {
      // Utiliza a data fornecida pelo front-end como limite superior
      dataLimite = new Date(data);
    } else {
      // Define a data de 24 horas atrás a partir da data atual
      dataLimite = new Date();
      dataLimite.setHours(dataLimite.getHours() - 24);
    }

    // Busca os registros de histórico do usuário baseado na data fornecida ou nas últimas 24 horas
    const historico = await Historico.findAll({
      where: {
        userId,
        data_hora: {
          [Op.between]: [dataLimite, dataAtual],
        },
      },
    });

    res.status(200).json({ historico });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar histórico", detalhes: error.message });
  }
}

async function ultimaGlicose(req, res) {
  const userId = req.params.userID;

  try {
    // Busca o último registro no histórico associado ao usuário
    const ultimoHistorico = await Historico.findOne({
      where: { userId },
      order: [["createdAt", "DESC"]], // Ordena pela data de criação em ordem decrescente
    });

    if (!ultimoHistorico) {
      return res
        .status(404)
        .json({ erro: "Nenhum histórico encontrado para este usuário" });
    }

    res.status(200).json({
      mensagem: "Última glicose encontrada",
      glicose: ultimoHistorico.glicose,
    });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar última glicose", detalhes: error.message });
  }
}

module.exports = {
  historicoInsulina,
  ultimaGlicose,
};
