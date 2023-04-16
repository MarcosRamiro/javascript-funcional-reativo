import { readFile } from "fs";
import { resolve as _resolve } from "path";

function lerArquivo(arquivo) {
  let caminho = _resolve(__dirname, arquivo);

  return new Promise((resolve, reject) => {
    readFile(caminho, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    });
  });
}

lerArquivo("data.txt")
  .then((data) => data.split("\r\n"))
  .then((linhas) => linhas.join(", "))
  .then((linha) => linha.substring(0, linha.length - 2))
  .then(console.log)
  .catch((err) => console.log(`Erro: ${err}`));
