//instanciação do serviço responsável por realizar requisições HTTP ao enpoint clients
angular.module('provaNava').service('clientAPI', function($http, config){
    //Método GET para recuperar listagem de clientes
    this.getClients = function(){
        return $http.get(config.baseUrl + "/clients");
    }
    //Método POST para inserção de clientes no banco de dados
    this.addClient = function(client){
        return $http.post(config.baseUrl + "/clients", client)
    }

    //Método DELETE para remoção de clientes
    this.deleteClient = function(cnpj){
        return $http.delete(config.baseUrl + "/clients/" + cnpj)
    }
});

