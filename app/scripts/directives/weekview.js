/**
 * Created by synerzip on 11/07/15.
 */
angular.module("ui-calendar")
    .directive("weekView", [function () {
        return {
            restrict: 'E',
            scope:{

            },
            require: "^calendarUi",
            templateUrl: '/scripts/directives/templates/weekview.html',
            link: function(scope, element, attrs, controller) {
                var calendarCtrl = controller;
                buildWeekData(scope,calendarCtrl);

                //Watch for currently selected date
                scope.$watch(function(scope){
                    return calendarCtrl.selected;
                },function(newValue){
                    if(newValue !== undefined) {
                        buildWeekData(scope,calendarCtrl);
                    }
                });

                //Watch next
                scope.$watch(function(scope){
                    return  calendarCtrl.next;
                },function(newValue){
                    if(newValue !== undefined && newValue == true) {
                        calendarCtrl.todayAvailable = false;
                        var day = calendarCtrl.selected;
                        day.add(1, "w");
                        calendarCtrl.selected = day.clone();
                        calendarCtrl.next = false;
                        buildWeekData(scope,calendarCtrl);
                    }
                });

                //Watch Previous
                scope.$watch(function(scope){
                    return  calendarCtrl.previous;
                },function(newValue){
                    if(newValue !== undefined && newValue == true) {
                        calendarCtrl.todayAvailable = false;
                        var day = calendarCtrl.selected;
                        day.subtract(1, "w");
                        calendarCtrl.selected = day.clone();
                        calendarCtrl.previous = false;
                        buildWeekData(scope,calendarCtrl);
                    }
                });
            }
        };

        function buildWeekData(scope, calendarCtrl){
            calendarCtrl.todayAvailable = false;
            calendarCtrl.selected = (calendarCtrl.selected || moment());
            var day = (calendarCtrl.selected);
            scope.days = _buildWeek(day,scope,calendarCtrl);
        }

        function _buildWeek(date, scope,calendarCtrl) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                var lastDayOfWeek = false;
                if (i == 6) {
                    lastDayOfWeek = true;
                }
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date,
                    lastDayOfWeek: lastDayOfWeek
                });
                date = date.clone();
                if (date.isSame(new Date(), "day")) {
                    calendarCtrl.todayAvailable = true;
                }
                date.add(1, "d");
            }
            calendarCtrl.startDate = days[0].date;
            calendarCtrl.endDate = days[6].date;
            return days;
        }
    }]);


