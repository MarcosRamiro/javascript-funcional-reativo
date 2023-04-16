const { from, Observable } = require('rxjs');

function primeiro(){
    return function(source$){
        return new Observable(subscriber => {
            source$.subscribe({
                next(v){
                    subscriber.next(v);
                    subscriber.complete();
                },
                error(e){
                    subscriber.error(e);
                },
                complete(){
                    subscriber.complete();
                }
            });
        });

    }
}

function nenhum(dado){
    return function(source$){
        return new Observable(subscriber => {
            source$.subscribe({
                next(_){
                    subscriber.complete();
                }
            });
        });

    }
}



const ultimo = () => {
    return source$ => {
        return new Observable(subscriber => {
            let ultimo;
            source$.subscribe({
                next(v){
                    ultimo = v;
                },
                error(e){
                    subscriber.error(e);
                },
                complete(){
                    if(ultimo !== undefined){
                        subscriber.next(ultimo);
                    }
                    subscriber.complete();
                }
            });
        });
    }
}

from([1,2,3,4,5,6,7,8,9,10, "Maria"])
    .pipe(
        //primeiro(),
        //nenhum(),
        //ultimo()
        )
    .subscribe(console.log);

