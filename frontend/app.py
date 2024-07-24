# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt
from sympy import symbols, inverse_laplace_transform, pprint
import io
import base64

app = Flask(__name__)
CORS(app, resources={r"/ajuste-curva": {"origins": "*"}})

# Função de resposta ao degrau de 1ª ordem
def func_degrau(t, A, K, tau):
    return A * K * (1 - np.exp(-t / tau))


@app.route('/ajuste-curva', methods=['POST'])
@cross_origin()  # Adicione esta linha para permitir CORS nesta rota
def ajuste_curva():
    data = request.get_json()

    # Dados de entrada
    x_data = np.array([0, 60, 120, 180, 240, 300, 360])
    y_data =  np.array(request.json.get('y_data'))
    print(y_data)

    # Realiza os ajustes utilizando os valores iniciais p0
    params, _ = curve_fit(func_degrau, x_data, y_data, p0=[200, 1, 100])

    # Obtendo os parâmetros dos ajustes de curva
    A, K, tau = params

    # Cálculo do erro
    x_fit = np.linspace(min(x_data), max(x_data), 100)
    y_fit = func_degrau(x_fit, A, K, tau)

    # Plotagem dos dados e ajustes
    plt.scatter(x_data, y_data, label='Dados reais')
    plt.plot(x_fit, y_fit, label='Regressao degrau', color='purple')
    plt.legend()
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Ajuste de Curva com Resposta ao Degrau')

    # Salva a imagem do gráfico em memória
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)

    # Defina as variáveis simbólicas para a Transformada de Laplace
    t, s = symbols('t s')

    # Função de transferência de primeira ordem
    equacao_s = (K / (s * tau + 1))
    # equacao_t = inverse_laplace_transform(equacao_s, s, t)
    equacao_degrau_s = (A / s) * equacao_s
    equacao_degrau_t = inverse_laplace_transform(equacao_degrau_s, s, t)

    # Converte a imagem para base64 para enviar ao frontend
    img_str = base64.b64encode(buffer.getvalue()).decode('utf-8')

    # Retorna os resultados ao frontend
    return jsonify({
        'equacao_s': str(equacao_s),
        'equacao_degrau_t': str(equacao_degrau_t),
        'imagem_grafico': img_str
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
