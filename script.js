const formulario = document.querySelector('#sorteadorForm');
const listaEntrada = document.querySelector('#listaEntrada');
const resultadoBox = document.querySelector('#resultadoBox');
const resultado = document.querySelector('#resultado');
const btnSortear = document.querySelector('#btnSortear');
const btnLimpar = document.querySelector('#btnLimpar');
const status = document.querySelector('#status');

function obterItens() {
  return listaEntrada.value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item !== '');
}

function sortear(itens) {
  const indiceSorteado = Math.floor(Math.random() * itens.length);
  return itens[indiceSorteado];
}

function exibirResultado(vencedor) {
  resultado.textContent = vencedor;
  resultadoBox.classList.remove('hidden');

  resultado.classList.remove('revelar');
  void resultado.offsetWidth;
  resultado.classList.add('revelar');
}

function iniciarContagem(vencedor) {
  let contador = 3;
  btnSortear.disabled = true;
  btnLimpar.disabled = true;

  const intervalo = setInterval(() => {
    if (contador > 0) {
      status.textContent = `Sorteando... ${contador}`;
      contador -= 1;
      return;
    }

    clearInterval(intervalo);
    status.textContent = '';
    exibirResultado(vencedor);
    btnSortear.disabled = false;
    btnLimpar.disabled = false;
  }, 700);
}

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';

  const itens = obterItens();

  if (itens.length === 0) {
    resultadoBox.classList.add('hidden');
    status.textContent = 'Digite pelo menos um nome ou item para sortear.';
    listaEntrada.focus();
    return;
  }

  const vencedor = sortear(itens);
  iniciarContagem(vencedor);
});

btnLimpar.addEventListener('click', () => {
  listaEntrada.value = '';
  resultado.textContent = '---';
  resultadoBox.classList.add('hidden');
  status.textContent = '';
  listaEntrada.focus();
});
