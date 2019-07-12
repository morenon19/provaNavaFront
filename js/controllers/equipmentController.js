//Controller vinculado a view equipment.html
angular.module('provaNava').controller('equipmentController', function($scope, equipmentAPI){
    
    //Lista que armazena os equipamentos recuperados do banco de dados
    $scope.equipments = []

    //Instanciação da promisse a ser executada quando for realizada a 
    //requisição http de retornar uma lista de equipamentos
    $scope.getEquipments = function(){
        equipmentAPI.getEquipments().then(function (response, status){
            $scope.equipments = response.data
        })
    }

    //Chamada da promisse para carregar a listagem de equipamentos
    $scope.getEquipments()

    //Instanciação da promisse a ser executada quando for realizada a 
    //requisição http de inserir um equipamento
    $scope.cadEquip = function(equip){
        equip.active = 1
        equipmentAPI.addEquipment(equip).then(function(response, status){
            $scope.getEquipments()
        })
    }
    
    //Método para persistir a troca de status do equipamento
    $scope.changeStatus = function(equipment){
        if(equipment.active){
            let date = new Date()
            let dd = date.getDate()
            if(dd<10) dd = '0'+dd
            let mm = date.getMonth()
            if(mm<10) mm = '0'+mm

            let equip = {
                serial: equipment.serial,
                active: false,
                disabled: date.getFullYear() + "-" + mm + "-" + dd
            }
            equipmentAPI.changeStatus(equip).then(function(data, status){
                $scope.getEquipments()
            })
        }else{      
            let equip = {
                serial: equipment.serial,
                active: true,
                disabled: null
            }
            equipmentAPI.changeStatus(equip).then(function(data, status){
                $scope.getEquipments()
            })
        }
        
    }

    // Método responsável por fechar o modal de cadastro de equipamento
    $scope.closeModal= function(){
        $('#cadEquip').modal('hide')
    }

});