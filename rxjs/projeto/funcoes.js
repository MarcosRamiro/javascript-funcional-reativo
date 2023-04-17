const path = require("path");
const fs = require("fs");
const { Observable } = require("rxjs");

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
  return createPipeableOperator((subscriber) => ({
    next(caminho) {
      if (caminho.endsWith(parteFinal)) {
        subscriber.next(caminho);
      }
    },
  }));
}

function lerArquivo() {
  return createPipeableOperator((subscriber) => ({
    next(caminho) {
      try {
        const conteudo = fs.readFileSync(caminho, { encoding: "utf-8" });
        subscriber.next(conteudo);
      } catch (e) {
        console.log(`deu ruim ${e}`)
        subscriber.error(e);
      }
    },
  }));
}

function separarTextoPor(simbolo){
    return createPipeableOperator((subscriber) => ({
        next(texto){
            texto.split(simbolo).forEach(parte => subscriber.next(parte))
        }
    }))
}

function agruparElementos(){
    return createPipeableOperator((subscriber) => ({
        next(palavras){
            const agrupado = Object.values(palavras.reduce((acc, palavra) => {
                const el = palavra.toLowerCase()
                const qtde = acc[el] ? acc[el].qtde + 1 : 1
                acc[el] = { elemento: el, qtde }
                return acc
            }, {}))
            subscriber.next(agrupado)
        }
    }))
}

function removerElementosSeVazio(){
    return createPipeableOperator((subscriber) => ({
        next(texto){
            if(texto.trim()){
                subscriber.next(texto)
            }
        }
    }))
}

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

function removerSimbolos(simbolos){
    return createPipeableOperator((subscriber) => ({
        next(texto){
            const textoSemSimbolos = simbolos.reduce((acc, simbolo) => {
                return acc.split(simbolo).join("")
            }, texto)
            subscriber.next(textoSemSimbolos)
        }
    }))
    
}



module.exports = {
  lerDiretorio,
  terminadoCom,
  lerArquivo,
  separarTextoPor,
  removerElementosSeVazio,
  removerSimbolos,
  agruparElementos

};
