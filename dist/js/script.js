// ATIVAR LINKS DO MENU 

const links = document.querySelectorAll (".header-menu a");

function ativarLink(link) {
   const url = location.href;
   const href = link.href;
   if (url.includes(href)) {
     link.classList.add("ativo");
   }
}

links.forEach(ativarLink);

// ATIVAR ITEMS DO ORÇAMENTO

const parametros = new URLSearchParams(location.search);

function ativarProduto(parametro) {
  const elemento = document.getElementById(parametro);
  if(elemento) {
    elemento.checked = true;
  }
}

parametros.forEach(ativarProduto);

// PERGUNTAS FREQUENTES

const perguntas = document.querySelectorAll(".perguntas button");

function ativarPergunta(event) {
  const pergunta = event.currentTarget;
  const controls = pergunta.getAttribute('aria-controls');
  const resposta = document.getElementById(controls);

  resposta.classList.toggle("ativo");
  const ativo = resposta.classList.contains("ativo");
  pergunta.setAttribute("aria-expanded", ativo);
}

function eventosPerguntas(pergunta) {
  pergunta.addEventListener("click", ativarPergunta);
}

perguntas.forEach(eventosPerguntas);

// GALERIA DE BICICLETAS
const galeria = document.querySelectorAll('.cafe-imagens img');

const tituloGaleria = document.getElementById('title-coffee');

const precoGaleria = document.getElementById('price-coffee');

const galeriaContainer = document.querySelector('.cafe-imagens');

function trocarImagem(event) {
  const img = event.currentTarget;
  const media = matchMedia("(min-width: 1000px)").matches;
  if (media) {
    galeriaContainer.prepend(img);

    tituloGaleria.textContent = img.dataset.title; // Pega data-title
    precoGaleria.textContent = img.dataset.price;  // Pega data-price
  } 
  
}

function eventosGaleria(img) {
  img.addEventListener('click', trocarImagem);
}

galeria.forEach(eventosGaleria);

// ANIMAÇÃO

if (window.SimpleAnime) {
  new SimpleAnime();
}

// Função para extrair parâmetros da URL
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param); // Retorna "Cafe1.png" ou "Cafe2.png"
}

// Função para destacar a imagem correspondente
function destacarImagem() {
  const imgParam = getUrlParam('img'); // Pega o valor de ?img=...

  if (imgParam) {
    const galeria = document.querySelector('.cafe-imagens');
    const imagens = document.querySelectorAll('.cafe-imagens img');

    // Encontra a imagem com src correspondente ao parâmetro
    const imgSelecionada = Array.from(imagens).find(img => 
      img.src.includes(imgParam) // Verifica se o src contém "Cafe1.png" ou similar
    );

    if (imgSelecionada) {
      galeria.prepend(imgSelecionada); // Move para o topo da galeria

      // Atualiza título e preço
      tituloGaleria.textContent = imgSelecionada.dataset.title;
      precoGaleria.textContent = imgSelecionada.dataset.price;
    }
  }
}

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', destacarImagem);


