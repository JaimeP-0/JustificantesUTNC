// Script para mover archivos de _astro a assets para compatibilidad con Cordova
import { renameSync, existsSync } from 'fs';
import { join } from 'path';

const wwwDir = './www';
const astroDir = join(wwwDir, '_astro');
const assetsDir = join(wwwDir, 'assets');

try {
  if (existsSync(astroDir)) {
    if (existsSync(assetsDir)) {
      // Si assets ya existe, eliminar archivos antiguos
      const { rmSync } = await import('fs');
      rmSync(assetsDir, { recursive: true, force: true });
    }
    
    // Mover _astro a assets
    renameSync(astroDir, assetsDir);
    console.log('Moved _astro/ to assets/');
  } else {
    console.log('_astro/ directory does not exist, skipping...');
  }
} catch (error) {
  console.error('Error moving assets:', error);
  process.exit(1);
}

