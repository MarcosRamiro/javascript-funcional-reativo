const { Observable, Subject } = require("rxjs");

function getObservable() {
  return new Observable((subscriber) => {
    console.log("#01 Observable");
    subscriber.next(Math.random());
    subscriber.next("RxJS");
    subscriber.next("é");
    subscriber.next("bem");
    subscriber.next("poderoso!");
    setTimeout(() => {
      subscriber.next("Ei...");
      subscriber.complete();
    }, 1000);
  });
}

function getSubject() {
  let sub$ = new Subject();
  
  setTimeout(() => {
    console.log("#02 Subject");
    sub$.next(Math.random());
    sub$.next("RxJS");
    sub$.next("é");
    sub$.next("bem");
    sub$.next("poderoso!");
    sub$.next("Ei...");
    sub$.complete();
  }, 1000);

  return sub$;
}

let obs$ = getSubject();
    obs$.subscribe(console.log);
    obs$.subscribe(console.log);
