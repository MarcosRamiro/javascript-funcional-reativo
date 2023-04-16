const { from, Observable } = require('rxjs');

const { primeiro, nenhum, ultimo } = require('./pipe/funcoes.js');

from([1,2,3,4,5,6,7,8,9,10, "Maria"])
    .pipe(
        //primeiro(),
        nenhum(),
        //ultimo()
        )
    .subscribe(console.log);

