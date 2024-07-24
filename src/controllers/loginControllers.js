const express = require("express");
const Usuario = require("../models/usuario");
const jwt = require('jsonwebtoken');

async function fazerLogin(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    console.log('Usuário encontrado:', usuario);
    console.log('Email recebido:', email);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    console.log('Senha do usuário do banco:', usuario.senha);
    console.log('Senha recebida:', senha);
    console.log('Tipo da senha do usuário do banco:', typeof usuario.senha);
    console.log('Tipo da senha recebida:', typeof senha);
    if (usuario.senha.trim().toLowerCase() !== senha.trim().toLowerCase()) {
      console.log('Senhas não correspondem');
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    // Se chegou até aqui, as credenciais estão corretas
    const token = jwt.sign({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      crm: novoUsuario.crm
    }, 'segredo');
    return res
      .status(200)
      .json({ mensagem: "Login bem-sucedido", token });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao fazer login", detalhes: error.message });
  }
}

module.exports = fazerLogin;