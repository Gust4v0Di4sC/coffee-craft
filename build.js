const fs = require('fs');
const htmlMinifier = require('html-minifier');
const terser = require('terser');
const cleanCSS = require('clean-css');

// Função principal async
async function build() {
  try {
    // Minificar HTML
    const html = fs.readFileSync('index.html', 'utf8');
    const minifiedHtml = htmlMinifier.minify(html, {
      collapseWhitespace: true,
      removeComments: true
    });

    // Minificar JS (com await dentro de função async)
    const js = fs.readFileSync('js/script.js', 'utf8');
    const minifiedJs = await terser.minify(js);

    // Minificar CSS
    const css = fs.readFileSync('css/style.css', 'utf8');
    const minifiedCss = new cleanCSS().minify(css).styles;

    // Criar estrutura de pastas
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
      fs.mkdirSync('dist/js');
      fs.mkdirSync('dist/css');
    }

    // Salvar arquivos
    fs.writeFileSync('dist/index.html', minifiedHtml);
    fs.writeFileSync('dist/js/script.js', minifiedJs.code);
    fs.writeFileSync('dist/css/style.css', minifiedCss);

    console.log('✅ Build concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o build:', error);
  }
}

// Executar a função
build();