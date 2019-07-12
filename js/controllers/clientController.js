//Controller vinculado a view client.html
angular.module('provaNava').controller('clientController', function ($scope, $exceptionHandler, clientAPI) {

    //Lista que armazena os clientes recuperados do banco de dados
    $scope.clients = []

    //Instanciação da promisse a ser executada quando for realizada a 
    //requisição http de retornar uma lista de clientes
    $scope.getClientes = function () {
        clientAPI.getClients().then(function (response, status) {
            $scope.clients = response.data
        })
    }

    //Chamada da promisse para carregar a listagem de clientes
    $scope.getClientes()

    //Instanciação da promisse a ser executada quando for realizada a 
    //requisição http de inserir um cliente
    $scope.cadCliente = function (client) {
        clientAPI.addClient(client).then(function (response, status) {
            $scope.getClientes()
            $scope.resetForm()

        })
    }

    //Instanciação da promisse a ser executada quando for realizada a 
    //requisição http de remover um cliente
    $scope.deleteClient = function (cnpj) {
        clientAPI.deleteClient(cnpj).then(function (response, status) {
            $scope.getClientes()
        })
    }

    //Método resposável por limpar os campos do formulário de cadastro 
    //de cliente (NÃO ESTÁ FUNCIONANDO)
    $scope.resetForm = function () {
        $scope.insertForm.$setPristine()
    }

    // Método responsável por fechar o modal de cadastro de cliente
    $scope.closeModal = function () {
        $('#cadClient').modal('hide')
    }
});