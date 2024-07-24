const express = require("express");
const Usuario = require("../models/usuario");
const Historico = require("../models/historico");
const jwt = require('jsonwebtoken');

async function cadastrarUser(req, res) {
  const { nome, email, senha, crm } = req.body;

  try {
    const novoUsuario = await Usuario.create({ nome, email, senha, crm });

    // Verifica se o usuário foi cadastrado com sucesso
    if (novoUsuario) {
      const token = jwt.sign({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        crm: novoUsuario.crm
      }, 'segredo');
      return res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso",
        token,
      });
    } else {
      res.status(400).json({ erro: "Não foi possível cadastrar o usuário" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao cadastrar usuário", detalhes: error.message });
  }
}

async function cadastrarHistorico(req, res) {
  const { glicose, data_hora } = req.body;
  const userId = req.params.userID;

  try {
    const novoHistorico = await Historico.create({
      userId, // Relaciona o histórico ao usuário usando o ID do usuário
      glicose,
      data_hora,
    });

    if (novoHistorico) {
      res.status(201).json({
        mensagem: "Histórico cadastrado com sucesso",
        historico: novoHistorico,
      });
    } else {
      res.status(400).json({ erro: "Não foi possível cadastrar o histórico" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao cadastrar histórico", detalhes: error.message });
  }
}

module.exports = { cadastrarUser, cadastrarHistorico };
