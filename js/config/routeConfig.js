//Configuração do módulo de rotas do AngularJS
angular.module('provaNava').config(function ($routeProvider){
    $routeProvider.when('/clients', {
        templateUrl: 'view/client.html',
        controller: 'clientController'
    }),
    $routeProvider.when('/equipments', {
        templateUrl: 'view/equipments.html',
        controller: 'equipmentController'
    }),
    $routeProvider.when('/cliequip', {
        templateUrl: 'view/clientEquipment.html',
        controller: 'clientEquipmentController'
    }).otherwise({
        redirectTo: '/clients'
    })
})