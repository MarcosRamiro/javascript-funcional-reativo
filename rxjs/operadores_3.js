const { of } = require('rxjs');

const { terminadoCom } = require('./pipe/funcoes.js');


of(['Ana Silva', 'Maria Silva', 'João Rocha'], 'Pedro Rocha', 'Marcos Silva')
    .pipe(terminadoCom('Silva'))
    .subscribe(console.log)

