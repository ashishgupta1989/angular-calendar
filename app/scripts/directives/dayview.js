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

            },
            require: "^calendarUi",
            templateUrl: '/scripts/directives/templates/dayview.html',
            link: function(scope, element, attrs, controller) {
                var calendarCtrl = controller;

                //Init to build data
                buildDayData(scope,calendarCtrl);

                //Watch for currently selected date
                scope.$watch(function(scope){
                    return calendarCtrl.selected;
                },function(newValue){
                    if(newValue !== undefined) {
                        //scope.selected = _removeTime(newValue);
                        buildDayData(scope,calendarCtrl);
                    }
                });

                //Watch next
                scope.$watch(function(scope){
                    return  calendarCtrl.next;
                },function(newValue){
                    if(newValue !== undefined && newValue == true) {
                        calendarCtrl.todayAvailable = false;
                        var day = calendarCtrl.selected;
                        calendarCtrl.selected = day.add(1, "d").clone();
                        calendarCtrl.next = false;
                        buildDayData(scope,calendarCtrl);
                    }
                });

                //Watch Previous
                scope.$watch(function(scope){
                    return  calendarCtrl.previous;
                },function(newValue){
                    if(newValue !== undefined && newValue == true) {
                        calendarCtrl.todayAvailable = false;
                        var day = calendarCtrl.selected;
                        calendarCtrl.selected = day.subtract(1, "d").clone();
                        calendarCtrl.previous = false;
                        buildDayData(scope,calendarCtrl);
                    }
                });
            }
        };

        function buildDayData(scope,calendarCtrl){
            //Build day data
            calendarCtrl.selected = calendarCtrl.selected || moment();
            var day = calendarCtrl.selected.clone();


            scope.selectedDate = {
                name: day.format("dd").substring(0, 1),
                number: day.date(),
                isCurrentMonth: day.isSame(new Date(),"month"),
                isToday: day.isSame(new Date(), "day"),
                date: day

            };

            if (day.isSame(new Date(), "day")) {
                calendarCtrl.todayAvailable = true;
            }else{
                calendarCtrl.todayAvailable = false;
            }


        }


    }]);

