const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

// Extensões permitidas
const ALLOWED_EXTENSIONS = new Set(['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp']);

async function copyAssets(src, dest) {
  await mkdir(dest, { recursive: true });
  
  const items = fs.readdirSync(src, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);
    const ext = path.extname(item.name).toLowerCase();

    if (item.isDirectory()) {
      // Ignora pastas específicas (opcional)
      if (['node_modules', '.git', 'dist'].includes(item.name)) continue;
      
      await copyAssets(srcPath, destPath);
    } else if (item.isFile() && ALLOWED_EXTENSIONS.has(ext)) {
      await copyFile(srcPath, destPath);
      console.log(`📦 Copiado: ${srcPath}`);
    }
  }
}

async function build() {
  try {
    await copyAssets('.', 'dist');
    console.log('✅ Build concluído! Apenas HTML, CSS, JS e assets foram copiados.');
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

build();