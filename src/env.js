const fs = require('fs')
const pathEnv = "./.env"
const pathEnvCopia = "./src/.env.copia"

function envExiste() {
  try {
    if (fs.existsSync(pathEnv)) {
      return true;
    }
  } catch (e) {
    return false;
  }
}

function verificarEnv() {
  if (envExiste()) {
    console.log("Archivo .ENV existe!")
  } else {
    console.log("Archivo .ENV NO existe!")
    crearEnv();
  }
}

function crearEnv() {
  // Copiar el archivo de forma asíncrona
  fs.copyFile(pathEnvCopia, pathEnv, (err) => {
    if (err) {
      console.error('Error al copiar el archivo:', err);
      return;
    }
    console.log('Archivo .env copiado exitosamente');
  });
}

module.exports = env = { verificarEnv };