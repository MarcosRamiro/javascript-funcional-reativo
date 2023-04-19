const { Observable, pipe } = require("rxjs");
const { filter, take, last } = require("rxjs/operators");

function terminadoCom(parteFinal) {
  return pipe(
    filter(texto => texto.endsWith(parteFinal))
  );
}

function primeiro() {
  return pipe(
          take(1)
  )
}

function nenhum(primeiraLetra) {
  return pipe(
          take(0)
  )
}

const ultimo = () => {
    return pipe(
      last()
    )
}

module.exports = {
  terminadoCom,
  ultimo,
  nenhum,
  primeiro,
};
