const { Observable, debounce } = require("rxjs");
const { last, first, debounceTime } = require("rxjs/operators");

function elementosComDelay(tempo, ...elementos) {
  return new Observable(subscriber => {
    (elementos || []).forEach((el, i) => {
      setTimeout(() => {
        if(i === 3){
            subscriber.next(el);
        }
        subscriber.next(el);
        if (elementos.length === i + 1) {
          subscriber.complete();
        }
      }, tempo * (i + 1));
    });
  });
}

elementosComDelay(2000, 1, "Maria", [1, 2, 3], "Marcos", false, 6, true, 8, 9, undefined)
    .pipe(debounceTime(100))
    .subscribe(console.log);

console.log("Fim!")
