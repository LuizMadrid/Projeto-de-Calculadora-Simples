document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#displayInput");
  const botaoIgual = document.querySelector(".igual");
  const botaoPonto = document.querySelector(".ponto");
  const botoesNum = document.querySelectorAll(".num");
  const botoesOperadores = document.querySelectorAll(".operador");

  let operacaoAtual = ""; // O que está sendo executado no momento.
  let operador = null;
  let valorAnterior = "";
  let calculando = false; // Se ta executando alguma operação.

  function atualizaDisplay() {
    display.value = operacaoAtual;
  }

  function insereNumero(e) {
    if (calculando) {
      operacaoAtual = e.target.textContent;
      calculando = false;
    } else {
      operacaoAtual += e.target.textContent;
    }

    atualizaDisplay();
  }

  function inserePonto() {
    if (operacaoAtual.indexOf(".") === -1) {
      operacaoAtual += ".";
      atualizaDisplay();
    }
  }

  function insereOperador(e) {
    if (operacaoAtual !== "") {
      if (!calculando) {
        if (operador !== null) {
          calcula();
        }
        valorAnterior = operacaoAtual;
        operacaoAtual = "";
      }
      operador = e.target.textContent;
    }
  }

  function calcula() {
    let resultado = null;
    const operandoAnterior = parseFloat(valorAnterior);
    const operandoAtual = parseFloat(operacaoAtual);

    switch (operador) {
      case "+":
        resultado = operandoAnterior + operandoAtual;
        break;
      case "-":
        resultado = operandoAnterior - operandoAtual;
        break;
      case "*":
        resultado = operandoAnterior * operandoAtual;
        break;
      case "/":
        resultado = operandoAnterior / operandoAtual;
        break;
    }

    operacaoAtual = String(resultado);
    valorAnterior = operacaoAtual;
    calculando = true;
    atualizaDisplay();
  }

  // Eventos.
  botaoPonto.addEventListener("click", inserePonto);
  botoesNum.forEach((botao) => botao.addEventListener("click", insereNumero));
  botoesOperadores.forEach((botao) =>
    botao.addEventListener("click", insereOperador)
  );
  botaoIgual.addEventListener("click", calcula);
});
