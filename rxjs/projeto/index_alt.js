const { lerDiretorio, terminadoCom, lerArquivo, separarTextoPor, removerElementosSeVazio, removerSimbolos, agruparElementos } = require("./funcoes");

const { first, tap, map, toArray, groupBy, mergeMap, reduce } = require("rxjs/operators")

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
        map(palavra => palavra.toLowerCase()),
        groupBy(el => el),
        mergeMap(group => group.pipe( toArray())),
        map(array => ({ elemento: array[0], qtde: array.length })),
        toArray(),
        map(array => array.sort((a, b) => b.qtde - a.qtde)),
    )
    .subscribe(console.log)

console.log("Fim")