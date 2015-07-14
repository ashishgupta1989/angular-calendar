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
                var calendarCtrl = controller;

                //Watch for currently selected date
                scope.$watch(function(scope){
                    return calendarCtrl.selected;
                },function(newValue){
                    if(newValue !== undefined) {
                        //scope.selected = _removeTime(newValue);
                        element.pickadate().pickadate('picker').set('select', newValue.valueOf())
                    }
                });
                element.pickadate({
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15, // Creates a dropdown of 15 years to control year
                    onClose: function() {
                        goto(new Date());
                    },
                    onSet: function(argument) {
                        if(argument.select != undefined && calendarCtrl.selected != argument.select) {
                            scope.$apply(function(){
                                controller.selected = moment(argument.select);
                            });

                            this.close();
                        }
                    }
                });
            };
        }
    };
}]);