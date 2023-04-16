function testoComTamanhoEntre(min){
    console.log('testoComTamanhoEntre: ' + min)
    return function(max){
        console.log('testoComTamanhoEntre -> max: ' + max)
        return function(erro){
            console.log('testoComTamanhoEntre -> max -> erro: ' + erro)
            return function(texto){
                console.log('testoComTamanhoEntre -> max -> erro -> texto: ' + texto)
                const tamanho = (texto || '').trim().length
                if(tamanho < min || tamanho > max){
                    throw erro
                }
            }
        }
    }
}
console.log('1')
const forcarTamanhoPadrao = testoComTamanhoEntre(4)(255)
console.log('2')
const forcarNomeProdutoValido = forcarTamanhoPadrao('Nome inválido!')
console.log('3')
forcarNomeProdutoValido('Notebook')