let medidas = [];

function cadastrarGlico(){
    var glic = document.getElementById("glicose").value;
    var date = new Date();
    medidas.push({glicose: glic, data: date});
    console.log(medidas);
}
function excluir(){
    medidas = [];
    console.log(medidas);
}
