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
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + 'templates/weekview.html',
            link: function(scope){
                scope.dayOfweeks = {

                };
            }
        };
    }]);


