/**
 * Created by ashishgupta on 13/07/15.
 */
angular.module("ui-calendar")
    .directive("datepicker", [function () {
        return {
        restrict: "E",
        require: "^calendarUi",
        compile: function (element, attrs) {
            var html = "<input type='date' class='datepicker' placeholder='Select Date'></input>";
            var newElem = $(html);
            element.replaceWith(newElem);
            return function (scope, element, attrs, controller) {
                element.pickadate({
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15, // Creates a dropdown of 15 years to control year
                    onClose: function() {
                        goto(new Date());
                    },
                    onSet: function(argument) {
                        if(argument.select != undefined) {
                            this.close();
                        }
                    }
                });
            };
        }
    };
}]);