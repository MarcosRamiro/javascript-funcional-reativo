const { lerDiretorio, terminadoCom, lerArquivo, separarTextoPor, removerElementosSeVazio, removerSimbolos, agruparElementos } = require("./funcoes");

const { first, map, toArray } = require("rxjs/operators")

caminho = __dirname + "/arquivos"

const simbolos = ["ramimar", "\r", ".", ",", "?", "!", "-", ":", ";", "(", ")", "[", "]", "{", "}"]

lerDiretorio(caminho)
    .pipe(
        terminadoCom(".txt"),
        lerArquivo(),
        separarTextoPor("\n"),
        removerElementosSeVazio(),
        removerSimbolos(simbolos),
        separarTextoPor(" "),
        toArray(),
        agruparElementos(),
        map(array => array.sort((a, b) => b.qtde - a.qtde)),


        //first() // retorna apenas o primeiro elemento
    )
    .subscribe(console.log)

console.log("Fim")