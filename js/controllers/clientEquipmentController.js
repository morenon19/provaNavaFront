//Controller vinculado a view clientEquipment.html
angular.module('provaNava').controller('clientEquipmentController', function ($scope, clientAPI, equipmentAPI) {

    //Lista que armazena os clientes recuperados do banco de dados
    $scope.clients = []
    //Lista que armazena os equipamentos recuperados do banco de dados
    $scope.equips = []
    //Lista que armazena os equipamentos vinculados ao cliente selecionado na interface
    $scope.clientEquips = []

    //Instanciação da promisse a ser executada quando for realizada a 
    //requisição http de retornar uma lista de clientes
    $scope.getClients = function () {
        clientAPI.getClients().then(function (response, status) {
            $scope.clients = response.data
        })
    }
    //Instanciação da promisse a ser executada quando for realizada a 
    //requisição http de retornar uma lista de clientes que não tem valores na chave client_cnpj
    $scope.getEquips = function () {
        equipmentAPI.getNotBoundEquips().then(function (response, status) {
            $scope.equips = response.data
        })
    }
    //Instanciação da promisse a ser executada quando for realizada a requisição
    //http de retornar uma lista de equipamentos vinculados ao cliente selecionado na interface
    $scope.getClientEquips = function (cnpj) {
        equipmentAPI.getClientEquips(cnpj).then(function (response, status) {
            $scope.getEquips()
            $scope.clientEquips = response.data
        })
    }

    
    //Método responsável por transitar equipamentos da lista de 
    //equipamentos não vinculados para a lista de equipamentos vinculados
    $scope.addEquips = function (equips) {
        $scope.clientEquips = $scope.clientEquips.concat(equips)
        $scope.equips = $scope.equips.filter(function (val) {
            return equips.indexOf(val) == -1;
        });
    }

    //Método responsável por transitar equipamentos da lista de 
    //equipamentos vinculados para a lista de equipamentos não vinculados
    $scope.removeEquips = function (equips) {
        $scope.equips = $scope.equips.concat(equips)
        $scope.clientEquips = $scope.clientEquips.filter(function (val) {
            return equips.indexOf(val) == -1;
        });
    }

    //Instanciação da Promisse responsável por persistir no banco de dados
    //as transições realizadas pelo usuário na interface
    $scope.attEquips = function (cnpj) {
        equipmentAPI.addClients($scope.clientEquips, cnpj).then(function () {
            equipmentAPI.removeClients($scope.equips).then(function () {
                console.log("feito")
            })
        })
    }

    //Restaura os valores das transições realizadas pelo usuário depois da 
    //última persistência de dados
    $scope.cancel = function () {
        $scope.getClientEquips()
        $scope.getClients()
    }

    //Método para exibir o status dos equipamentos cadastrados nas listas
    $scope.test = function (test) {
        if (test) {
            return "ATIVO"
        } else {
            return "DESATIVADO"
        }
    }

    //Chamada da promisse para carregar a listagem de clientes
    $scope.getClients()

});