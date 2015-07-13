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
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + 'templates/monthview.html',
        };
    }]);
