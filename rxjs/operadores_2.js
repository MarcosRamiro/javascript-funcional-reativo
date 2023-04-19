const { Observable, from } = require('rxjs');
const { count } = require('rxjs/operators');

const { primeiro, nenhum, ultimo } = require('./pipe/funcoes.js');

new Observable(subscriber => {
    let i = 0;
    let msg = "";
    if (!subscriber.closed){
        msg = `Número ${++i}`
        console.log(msg)
        subscriber.next(msg);
    } 
    if (!subscriber.closed){
        msg = `Número ${++i}`
        console.log(msg)
        subscriber.next(msg);
    } 
    if (!subscriber.closed){
        msg = `Número ${++i}`
        console.log(msg)
        subscriber.next(msg);
    }
    if (!subscriber.closed){
        msg = `Maria Número ${++i}`
        console.log(msg)
        subscriber.next(msg);
    }
    if (!subscriber.closed){
        msg = `Marcos Número ${++i}`
        console.log(msg)
        subscriber.next(msg);
    }
    if (!subscriber.closed){
        msg = `Mateus Número ${++i}`
        console.log(msg)
        subscriber.next(msg);
    } 
    if (!subscriber.closed) subscriber.complete();
    if (!subscriber.closed) console.log("Observable completo");
    
})
    .pipe(
        primeiro(),
        // nenhumL(),
        // ultimo(),
        count()
        )
    //.subscribe(console.log);


subs = from ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .pipe(
        primeiro(),
    )
.subscribe({
    next(v) { console.log(`Valor: ${v}`)},
    complete() { console.log("Observable completo!!") },
    error(e) { console.log(`Erro: ${e}`) }
})

// subs.unsubscribe()


console.log(subs)