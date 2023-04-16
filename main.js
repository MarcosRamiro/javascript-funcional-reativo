function esperaUmTempo(tempo = 2000){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('OK')
        }, tempo)
    })
}

async function naoEspera(){
    return 1;
}

//esperaUmTempo(3000)
//.then(() => console.log('Executando promise 1...'))

async function executa(){
    
    naoEspera().then( resp => console.log(`resp = ${resp}`))

    const fase1 = await esperaUmTempo(100)
    console.log(`Fase 1: ${fase1}`)
    
    const fase2 = await esperaUmTempo(2000)
    console.log(`Fase 2: ${fase2}`)

    return 'Fim'

}

executa()
    .then(console.log)

