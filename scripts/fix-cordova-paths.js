// Script para corregir rutas absolutas a relativas en archivos generados para Cordova
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname, relative as pathRelative } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const wwwDir = './www';


// Función para corregir rutas en un archivo HTML
function fixPathsInFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Obtener el directorio del archivo relativo a www
  const fileDir = dirname(filePath);
  const wwwDirAbsolute = join(process.cwd(), wwwDir);
  const relativeFromWww = pathRelative(wwwDirAbsolute, fileDir).replace(/\\/g, '/');
  
  // Calcular profundidad: si el archivo está en un subdirectorio de www, necesita ../ para volver a www
  // Los assets están en www/_astro/, así que necesitamos calcular cuántos ../ se necesitan
  let depth = 0;
  if (relativeFromWww && relativeFromWww !== '.') {
    // Si el archivo está en www/login, relativeFromWww = "login" (depth = 1)
    // Si está en www/alumno/formulario, relativeFromWww = "alumno/formulario" (depth = 2)
    const parts = relativeFromWww.split('/').filter(p => p && p !== '.');
    depth = parts.length;
  } else {
    // Si está en www directamente, depth = 0
    depth = 0;
  }
  const relativeBase = depth > 0 ? '../'.repeat(depth) : './';
  
  // Para Cordova con https://localhost/, necesitamos usar rutas absolutas desde la raíz
  // Cambiar todas las rutas _astro/ y assets/ a absolutas: /assets/
  
  // Reemplazar rutas CSS/JS relativas a absolutas (tanto _astro como assets)
  const patterns = [
    { from: /href=["']\.\/_astro\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\.\.\/_astro\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\.\.\/\.\.\/_astro\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\/\.\/_astro\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\/_astro\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\.\/assets\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\.\.\/assets\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\.\.\/\.\.\/assets\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\/\.\/assets\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /href=["']\/assets\/([^"']+)["']/g, to: 'href="/assets/${asset}"' },
    { from: /src=["']\.\/_astro\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\.\.\/_astro\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\.\.\/\.\.\/_astro\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\/\.\/_astro\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\/_astro\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\.\/assets\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\.\.\/assets\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\.\.\/\.\.\/assets\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\/\.\/assets\/([^"']+)["']/g, to: 'src="/assets/${asset}"' },
    { from: /src=["']\/assets\/([^"']+)["']/g, to: 'src="/assets/${asset}"' }
  ];
  
  patterns.forEach(({ from, to }) => {
    content = content.replace(from, (match, asset) => {
      return to.replace('${asset}', asset);
    });
  });
  
  // Solo escribir si hubo cambios
  if (content !== originalContent) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed paths in: ${filePath}`);
    return true;
  }
  return false;
}

// Buscar todos los archivos HTML
async function fixAllPaths() {
  try {
    const htmlFiles = await glob(`${wwwDir}/**/*.html`);
    let fixedCount = 0;
    
    htmlFiles.forEach(file => {
      if (fixPathsInFile(file)) {
        fixedCount++;
      }
    });
    
    console.log(`Fixed paths in ${fixedCount} file(s)`);
  } catch (error) {
    console.error('Error fixing paths:', error);
    process.exit(1);
  }
}

fixAllPaths();

