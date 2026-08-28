/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela padronização das mensagens e status code do projeto de filmes.
 * Data: 2026-04-17
 * Autor: Matheus Lucas
 * Versão: 1.0
 ********************************************************************************************************/


// Função para padronizar as messagens da API.
const DEFAULT_MESSAGE = {
    api_description: 'API para controlar projetos de Filmes',
    development: 'Matheus Lucas de Freitas Zacarias',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}


// Funções para retornar as mensagens de SUCESSO da API
const SUCCESS_CREATE_ITEM           = {status: true, status_code: 201, message: 'Item inserido com sucesso!'}

module.exports = {
    SUCCESS_CREATE_ITEM
}