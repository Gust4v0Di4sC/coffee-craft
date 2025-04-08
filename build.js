const fs = require('fs');
const { promisify } = require('util');
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

async function build() {
  try {
    // Criar pasta dist
    await mkdir('dist', { recursive: true });

    // Copiar TODOS os HTMLs
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    await Promise.all(htmlFiles.map(file => copyFile(file, `dist/${file}`)));

    // Copiar pastas
    const folders = ['css', 'js', 'img'];
    await Promise.all(folders.map(folder => {
      return fs.promises.cp(folder, `dist/${folder}`, { recursive: true });
    }));

    console.log('✅ Todas páginas e assets copiados!');
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

build();