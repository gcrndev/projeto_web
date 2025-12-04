# ArtMind Lab (HTML estático)

Versão em HTML5, CSS3 e JavaScript puro do site ArtMind Lab. O layout original foi preservado e estruturado com Bootstrap 5 via CDN, sem dependências de build.

## Estrutura
- `index.html` — Página inicial
- `projeto.html` — Detalhes do projeto ArtMind Lab
- `parceiros.html` — Parceiros &amp; investidores
- `contactos.html` — Formulário e contactos
- `404.html` — Página de erro
- `css/bootstrap.min.css` — Subconjunto local do Bootstrap para grid/utilidades
- `css/style.css` — Tema, tipografia e componentes visuais
- `js/main.js` — Navegação, scroll-to-top e validação do formulário
- `img/` — Imagens e logotipos fictícios usados no site

## Como usar
1. Abra `index.html` diretamente no navegador ou sirva a pasta com um servidor estático simples (ex.: `python -m http.server`).
2. Certifique-se de estar online para carregar o CSS/JS do Bootstrap e os Bootstrap Icons via CDN.

## Tecnologias
- HTML5 + Bootstrap 5
- CSS3 (variáveis de cor e estilos próprios)
- JavaScript ES6+ para interações básicas (menu móvel, botão “voltar ao topo”, validação e feedback do formulário).

## Guia rápido (explicação para iniciantes)
- `index.html`: página inicial com hero e cartões da equipa.
- `projeto.html`: descreve o projeto fictício e a linha temporal.
- `parceiros.html`: lista parceiros/investidores com logótipos.
- `contactos.html`: contactos, mapa embebido e formulário validado no front.
- `404.html`: página de erro para rotas inexistentes.
- `css/bootstrap.min.css`: utilidades do Bootstrap (grid, espaçamentos, alinhamentos).
- `css/style.css`: identidade visual (cores, fontes, botões, heros).
- `js/main.js`: comportamentos (menu mobile, link ativo, back-to-top, validação do formulário).
- `img/`: imagens da equipa, logótipos e favicon.
