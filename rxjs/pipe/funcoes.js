const { Observable } = require("rxjs");

function terminadoCom(parteFinal) {
  return function (source$) {
    return new Observable((subscriber) => {
      source$.subscribe({
        next(valor) {
          if (Array.isArray(valor)) {
            subscriber.next(valor.filter((el) => el.endsWith(parteFinal)));
          } else if (typeof valor === "string") {
            if (valor.endsWith(parteFinal)) {
              subscriber.next(valor);
            }
          }
        },
        error(e) {
          subscriber.error(e);
        },
        complete() {
          subscriber.complete();
        },
      });
    });
  };
}

function primeiro() {
  return createPipeableOperator(subscriber => ({
      next(valor) {
        console.log("primeiro...");
        subscriber.next(valor);
        subscriber.complete();
      },
      complete() {
      }
    }));
}

function nenhum() {
    return createPipeableOperator(subscriber => ({
        next: _ => { 
            console.log("nenhum...");
            subscriber.complete()
        }
      }));
}

const ultimo = () => {
    let ultimo
    return createPipeableOperator(subscriber => ({
        next(valor) {
          ultimo = valor
        },
        complete() {
            if (ultimo !== undefined) {
              subscriber.next(ultimo);
            }
            subscriber.complete();
        }
      }));
}

function createPipeableOperator(operatorFn) {
  return function (source$) {
    return new Observable((subscriber) => {
    let sub = operatorFn(subscriber)
      source$.subscribe({
        next: sub.next,
        error: sub.error || (e => subscriber.error(e)),
        complete: sub.complete || (() => subscriber.complete())
    });
    });
  };
}

module.exports = {
  terminadoCom,
  ultimo,
  nenhum,
  primeiro,
};
