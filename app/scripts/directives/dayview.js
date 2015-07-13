/**
 * Created by synerzip on 10/07/15.
 */
/**
 * Created by synerzip on 10/07/15.
 */


angular.module("ui-calendar")
    .directive("dayView", [function () {
        return {
            restrict: 'E',
            scope:{
                day:"="
            },
            templateUrl: '/scripts/directives/templates/dayview.html',
            link: function(scope){
                scope.dayOfweeks = {

                };
            }
        };
    }]);

