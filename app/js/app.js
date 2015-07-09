/**
 * Created by synerzip on 09/07/15.
 */
angular.module("app",["ui-calendar"])
.controller("appController",["$scope",function($scope){
       var today = moment();
        $scope.day =  today.month(today.month()+1);
    }]);