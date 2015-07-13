/**
 * Created by synerzip on 11/07/15.
 */
angular.module("ui-calendar")
    .directive("weekView", [function () {
        return {
            restrict: 'E',
            scope:{
                day:"="
            },
            templateUrl: '/scripts/directives/templates/weekview.html',
            link: function(scope){
                scope.dayOfweeks = {

                };
            }
        };
    }]);


