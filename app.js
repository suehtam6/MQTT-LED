/*********************************************************************************************************
 * Objetivo: Arquivo responsável pelo POST do IOTT
 * Data: 2026-08-28
 * Autor: Matheus Lucas
 * Versão: 1.0
 ********************************************************************************************************/

const PORT = process.env.PORT || 8080

// Import das dependencias para criar a API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

// Para fazer a comunicação entre a API e o ESP32 é necessário instalar
// a dependencia mqtt, código logo abaixo
//npm install mqtt --save

//Import da biblioteca para utilizar na comunicação com o ESP32
const mqtt = require('mqtt')

// aqui é o client, ele que vai se conectar com o MQTT e fazendo a sala de bate papo
const clientMQTT = mqtt.connect('mqtt://broker.hivemq.com')


// Permitindo a utilização do JSON no body das requisições.
const bodyParserJSON = bodyParser.json()


// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: '*', //Configuração de origem da requisição(IP ou Dominio).
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //Configuração dos verbos que serão utilizados na API.
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões.
                    //Tipo de dados  //Autorização de acesso 
}

// Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

app.post('/v1/iot/led',cors(), bodyParserJSON, async function(request, response) {
    // Recebendo o body da requisição
    let  dados = request.body
    
    // Encaminha o comando para o servidor do MQTT para enviar ao ESP32
    // É importante utilizar o mesmo caminho de cominicação criado no ESP32 que seria o ( "TOPIC" ) que ja está criado la
    if(String(dados.comando).toUpperCase() == 'LIGAR'){
        clientMQTT.publish('senaijandira/ds/tarde/led/1', 'ligar')
    }else if(String(dados.comando).toUpperCase() == 'DESLIGAR'){
        clientMQTT.publish('senaijandira/ds/tarde/led/1', 'desligar')
    }


    response.status(200)
    response.json({'message' : 'Comando enviado com sucesso'})

})

// Faz um start na API (Aguardando requisição)
app.listen(PORT, function(){
    console.log('API aguardando novas requisições...')
})