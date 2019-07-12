//instanciação do serviço responsável por realizar requisições HTTP ao enpoint clients
angular.module('provaNava').service('equipmentAPI', function($http, config){
    //Método GET para recuperar listagem de clientes
    this.getEquipments = function(){
        return $http.get(config.baseUrl + "/equipments");
    }
    //Método POST para inserção de equipamentos no banco de dados
    this.addEquipment = function(equipment){
        return $http.post(config.baseUrl + "/equipments", equipment)
    }
    //Método PUT para atualizar o status dos equipamentos
    this.changeStatus = function(equipment){
        return $http.put(config.baseUrl + "/equipments/" + equipment.serial + "/cst", equipment)
    }
    //Método GET para recuperar listagem de clientes sem valores na coluna client_cnpj
    this.getNotBoundEquips = function(){
        return $http.get(config.baseUrl + "/equipments/null")
    }
    //Método GET para recuperar listagem de equipamentos vinculados a um cliente
    this.getClientEquips = function(cnpj){
        return $http.get(config.baseUrl + "/equipments/client/" + cnpj)
    }
    //Método POST para adicionar o valor de cnpj a coluna cliente_cnpj do equipamento
    this.addClients = function(equips, cnpj){
        return $http.post(config.baseUrl + "/equipments/addclients/" + cnpj, equips)
    }
    //Método POST para remover o valor de cnpj a coluna cliente_cnpj do equipamento
    this.removeClients = function(equips){
        return $http.post(config.baseUrl + "/equipments/removeclients", equips)
    }
});

