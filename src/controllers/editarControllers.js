const express = require("express");
const Usuario = require("../models/usuario");
const jwt = require('jsonwebtoken');

async function editarUsuario(req, res) {
  const { nome, email, crm } = req.body;
  const userId = req.params.userID;

  try {
    // Encontra o usuário pelo ID na sessão
    const usuario = await Usuario.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // Atualiza os dados do usuário, verificando se os campos foram fornecidos
    usuario.nome = nome !== undefined ? nome : usuario.nome;
    usuario.email = email !== undefined ? email : usuario.email;
    usuario.tipo_crm = crm !== undefined ? crm : usuario.crm;
    // Salva as alterações no banco de dados
    await usuario.save();

    res
      .status(200)
      .json({ mensagem: "Dados do usuário atualizados com sucesso", usuario });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao editar usuário", detalhes: error.message });
  }
}

module.exports = editarUsuario;
