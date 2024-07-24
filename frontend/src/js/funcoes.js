//import jwt from 'jsonwebtoken';

let token = null;

function redirecionarPerfil() {
    const tokenValue = localStorage.getItem('token');
    if (tokenValue) {
        window.location.href = "./perfil.html";
        console.log(token);
    } else {
        alert('Token não encontrado. Algo deu errado.');
    }
}

function redirecionarParaGlicocon() {
    const tokenValue = localStorage.getItem('token');
    if (tokenValue) {
        window.location.href = "./glicocon.html";
    } else {
        alert('Token não encontrado. Algo deu errado.');
    }
}

function cadastrarUser(){
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var crm = document.getElementById("crm").value;

    const requestBody ={
        nome,
        email,
        senha,
        crm
    };

    console.log(nome, email, senha, crm);

    fetch('http://localhost:3000/cadastrarUser', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
            //alert('Usuário cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    })
    .then(data => {
        if (data && data.token) {
            token = data.token;
            localStorage.setItem('token', token);
            setCookies(token);
            redirecionarParaGlicocon();
        } else {
            alert('Token não recebido');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
    });

}

function fazerLogin(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const requestBody = {
        email,
        senha
    };

    console.log(email, senha);
    
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Credenciais incorretas.');
        }
    })
    .then(data => {
        if (data && data.token) {
            token = data.token;
            localStorage.setItem('token', token);
            console.log('Token atualizado:', token); 
            setCookies(token);
            console.log(getIdFromCookie(), getNomeFromCookie(), getEmailFromCookie(), getCRM());
            redirecionarParaGlicocon();
        } else {
            throw new Error('Token não recebido');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert(error.message);
    });
}

function setCookies(token){
    const parts = token.split('.');
    const decoded = JSON.parse(atob(parts[1]));
    console.log(decoded.id, decoded.nome, decoded.email, decoded.crm);
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    document.cookie = `id=${decoded.id}; expires=${expires.toUTCString()}; path=/`;
    document.cookie = `nome=${decoded.nome}; expires=${expires.toUTCString()}; path=/`;
    document.cookie = `email=${decoded.email}; expires=${expires.toUTCString()}; path=/`;
    document.cookie = `crm=${decoded.crm}; expires=${expires.toUTCString()}; path=/`;
    console.log(document.cookie);
}


function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const cookieParts = cookie.split('=');
        if (cookieParts[0] === cookieName) {
            return cookieParts[1];
        }
    }
    return null;
}


function getIdFromCookie() {
    const cookieValue = getCookieValue('id');
    return cookieValue;
}

function getNomeFromCookie() {
    const cookieValue = getCookieValue('nome');
    return cookieValue;
}

function getEmailFromCookie() {
    const cookieValue = getCookieValue('email');
    return cookieValue;
}

function getCRM() {
    const cookieValue = getCookieValue('crm');
    return cookieValue;
}



function cadastrarHistorico(glicose, data){

}

function showDiv(){
    var div = document.getElementById("edit");
    if (div.style.display === "none") {
        div.style.display = "block";
    }else {
        div.style.display = "none";
      }
}
function cancelar(){
    var div = document.getElementById("edit");
    if (div.style.display === "block") {
      div.style.display = "none";
    }else {
        div.style.display = "none";
      }
}
function editarUsuario(){ // Tá com um BO
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var crm = document.getElementById("crm").value;
    const requestBody ={
        nome,
        email,
        crm
    };
    console.log(nome, email, crm);
    const id = getIdFromCookie();
    console.log(id);
    fetch('http://localhost:3000/editarUsuario/' + id, { // Adicione a barra antes do id
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            alert('Usuário atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar usuário. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao atualizar usuário. Tente novamente mais tarde.');
    });
    var div = document.getElementById("edit");
    if (div.style.display === "block") {
      div.style.display = "none";
    }else {
        div.style.display = "none";
      }
}
function setName(){
    var name = getNomeFromCookie();
    name = name.split(" ")[0];
    document.getElementById("userName").innerHTML = name;
}
function setData(){
    var name = getNomeFromCookie();
    var firstName = name.split(" ")[0];
    var email = getEmailFromCookie();
    var crm = getCRM();
    document.getElementById("userName").innerHTML = firstName;
    document.getElementById("userNameComp").innerHTML = name;
    document.getElementById("userEmail").innerHTML = email;
    document.getElementById("userCRM").innerHTML = crm;
}
