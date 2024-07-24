# Glicocon

## Descrição Geral

O **Glicocon** é um projeto inovador que consiste em uma aplicação web. Sua principal função é identificar o modelo dinâmico da curva glicêmica de indivíduos. Esta ferramenta foi desenvolvida com o objetivo de auxiliar profissionais de saúde no tratamento de pacientes com diabetes, contribuindo para um tratamento mais personalizado, eficaz e ágil, melhorando assim a qualidade de vida dos mesmos.

Diversas tecnologias foram usadas para o desenvolvimento da aplicação: 
- **Frontend:** Utilizou principalmente HTML, CSS, React, Javascript e as bibliotecas Charts JS e Jquery.
- **Backend:** Utilizou Javascript e NodeJS para definir a comunicação com o Banco de Dados, mySQL, além de definir e criar tabelas no mesmo.
- **API:** A aplicação consome também uma API desenvolvida em python para a identificação da função de transferência, degrau e plot de gráficos.

## Uso

O ambiente de desenvolvimento utilizado para a aplicação foi o **VS Code**, com a utilização das seguintes extensões:
- **Python:** Extensão que oferece suporte à linguagem Python no VS Code.
- **Pylance:** Extensão que fornece recursos avançados de linguagem para Python no VS Code.
- **HTML CSS: Support:** Extensão que oferece suporte aprimorado para HTML e CSS no VS Code.
- **JavaScript (ES6) code snippets:** Extensão que fornece trechos de código para JavaScript ES6 no VS Code.
- **Live Server:** Extensão que permite visualizar páginas da web estáticas e dinâmicas diretamente do VS Code.

## Instalação

Para garantir o funcionamento adequado do projeto, além dos interpretadores para as linguagens de programação, é crucial instalar as bibliotecas e extensões utilizadas.

### NodeJS
- **npm:** Gerenciador de pacotes do Node.js, utilizado para instalar e gerenciar as dependências do projeto.
- **nodemon:** Ferramenta utilizada para reiniciar automaticamente o servidor sempre que ocorrem alterações nos arquivos do projeto.
- **sequelize:** ORM (Object-Relational Mapping) para Node.js, utilizado para interagir com o banco de dados relacional.
- **express:** Framework web para Node.js, facilita a criação de APIs e aplicativos web.
- **cors:** Pacote que permite lidar com requisições de recursos de origens diferentes no Node.js.
- **jsonwetokens:** Utilizado para geração e verificação de tokens de autenticação no Node.js.

### Mysql
É necessário instalar o banco de Dados mySQL para armazenar os dados de cadastro e login da aplicação.

### Python
- **flask:** Framework web para Python, utilizado para criar a API responsável por funcionalidades específicas da aplicação.
- **flask_cors:** Extensão Flask para lidar com CORS (Cross-Origin Resource Sharing).
- **numpy:** Biblioteca para Python utilizada para manipulação de arrays e operações matemáticas.
- **matplotlib:** Biblioteca para criação de gráficos em Python.
- **sympy:** Biblioteca para matemática simbólica em Python, permitindo manipular expressões matemáticas de forma simbólica.

## Configuração

- **MySQL:** É importante criar uma base de dados no mySQL denominada "crud", definir a senha do usuário root como "123456" e dar as permissões de acesso para que a aplicação possa realizar as criações de tabelas, armazenamento e modificações de dados.
- **Backend:** Para inicializar deve-se utilizar o comando "nodemon index.js", o que conectará o backend ao banco de dados.
- **API:** Para inicializar a API basta selecionar o arquivo `app.py` e pressionar ctrl+F5.
- **Frontend:** Para inicializar basta selecionar o arquivo `index.html` e clicar no botão "Go Live". 


## Estrutura

Os diretórios e arquivos são estruturados da seguinte maneira:

- **Diretório Raiz (root):** Contém os arquivos `index.js`, responsável por iniciar o backend e conectar o banco de dados, `package.json` e `package-lock.json`, responsáveis por gerenciar as dependências do projeto. Além disso, contém o diretório `src`, que abriga os demais diretórios e arquivos do backend, e o diretório `frontend`, que contém os arquivos e diretórios do frontend, além do arquivo da API.
- **Diretório src:** Contém vários subdiretórios:
  - **Diretório config:** Contém o arquivo `db.js`, que configura o banco de dados.
  - **Diretório controllers:** Contém os arquivos `cadastroControllers.js` e `loginControllers.js`, responsáveis por definir as funções de cadastro e login no backend, respectivamente.
  - **Diretório models:** Contém o arquivo usuario.js, que define a tabela de usuários que será criada no banco de dados.
  - **Diretório routes:** Contém o arquivo index.js, que determina as rotas por onde o frontend passará os dados para o backend.
- **Diretório frontend:** Contém os arquivos `index.html`, que é a página inicial do projeto, e `app.py`, que é a API consumida pela aplicação. Além destes, contém o diretório `src`, que abriga os demais arquivos HTML das outras páginas, e os diretórios `css` e `js`.
  - **Diretório css:** Contém os arquivos de estilos das páginas e o diretório que contém as imagens utilizadas.
  - **Diretório js:** Contém os arquivos JS que contêm as funções que conectam o frontend e o backend, além de outras funções básicas de manipulação de tags necessárias para o funcionamento da aplicação.

