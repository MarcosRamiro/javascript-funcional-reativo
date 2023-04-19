const path = require("path");
const fs = require("fs");
const { Observable, pipe } = require("rxjs");
const { filter, switchMap, map  } = require("rxjs/operators");

function lerDiretorio(caminho) {
  return new Observable((subscriber) => {
    try {
      fs.readdirSync(caminho).forEach((arquivo) =>
        subscriber.next(path.join(caminho, arquivo))
      );
      subscriber.complete();
    } catch (e) {
      subscriber.error(e);
    }
  });
}

function terminadoCom(parteFinal) {
  return pipe(
    filter(caminho => caminho.endsWith(parteFinal))
  )
}

function lerArquivo() {
  return pipe (
    map(caminho => fs.readFileSync(caminho, { encoding: "utf-8" })
    )
  )
}

function separarTextoPor(simbolo) {
  return pipe (
    switchMap(texto => texto.split(simbolo))
  )
}

function agruparElementos() {
  return pipe(
    map(palavras => {
      return Object.values(
        palavras.reduce((acc, palavra) => {
          const el = palavra.toLowerCase();
          const qtde = acc[el] ? acc[el].qtde + 1 : 1;
          acc[el] = { elemento: el, qtde };
          return acc;
        }, {})
      );
    })
  );
}

function removerElementosSeVazio() {
  return pipe(filter((texto) => texto.trim()));
}
/*
function createPipeableOperator(operatorFn) {
  return function (source$) {
    return new Observable((subscriber) => {
      let sub = operatorFn(subscriber);
      source$.subscribe({
        next: sub.next,
        error: sub.error || ((e) => subscriber.error(e)),
        complete: sub.complete || (() => subscriber.complete()),
      });
    });
  };
}
*/

function removerSimbolos(simbolos) {
  return pipe(
    map((texto) =>
      simbolos.reduce((acc, simbolo) => {
        return acc.split(simbolo).join("");
      }, texto)
    )
  );
}

module.exports = {
  lerDiretorio,
  terminadoCom,
  lerArquivo,
  separarTextoPor,
  removerElementosSeVazio,
  removerSimbolos,
  agruparElementos,
};
