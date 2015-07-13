/**
 * Created by synerzip on 10/07/15.
 */


angular.module("ui-calendar")
    .directive("monthView", [function () {
        return {
            restrict: 'E',
            scope:{
                weeks:"="
            },
            templateUrl: '/scripts/directives/templates/monthview.html',
        };
    }]);
