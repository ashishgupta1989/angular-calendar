/**
 * Created by synerzip on 10/07/15.
 */


angular.module("ui-calendar")
    .directive("monthView", [function () {
        return {
            restrict: 'E',
            scope:{

            },
            templateUrl: '/scripts/directives/templates/monthview.html',
            require: "^calendarUi",
            link: function (scope, element, attrs, controller) {
                var calendarCtrl = controller;
                //Init to build data
                buildMonthData(scope,calendarCtrl);

                //Watch for currently selected date
                scope.$watch(function(scope){
                    return calendarCtrl.selected;
                },function(newValue){
                    if(newValue !== undefined) {
                        //scope.selected = _removeTime(newValue);
                        buildMonthData(scope,calendarCtrl);
                    }
                });

                //Watch next
                scope.$watch(function(scope){
                    return  calendarCtrl.next;
                },function(newValue){
                    if(newValue !== undefined && newValue == true) {
                        calendarCtrl.todayAvailable = false;
                        var next = scope.month.clone();
                        _removeTime(next.month(next.month() + 1).date(1));
                        scope.month.month(scope.month.month() + 1);
                        calendarCtrl.selected = scope.month;

                        _buildMonth(scope, next, scope.month,calendarCtrl);
                        calendarCtrl.next = false;
                    }
                });

                //Watch Previous
                scope.$watch(function(scope){
                    return  calendarCtrl.previous;
                },function(newValue){
                    if(newValue !== undefined && newValue == true) {
                        calendarCtrl.todayAvailable = false;
                        var previous = scope.month.clone();
                        _removeTime(previous.month(previous.month() - 1).date(1));
                        scope.month.month(scope.month.month() - 1);
                        calendarCtrl.selected = scope.month;
                        _buildMonth(scope, previous, scope.month,calendarCtrl);

                        calendarCtrl.previous = false;
                    }
                });

            }
        };

        function buildMonthData(scope,calendarCtrl){
            //Build month - weeks
            calendarCtrl.todayAvailable = false;
            calendarCtrl.selected = (calendarCtrl.selected || moment());
            scope.month = calendarCtrl.selected.clone();



            var start = calendarCtrl.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month,calendarCtrl);
        }
        function _removeTime(date) {
            return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }

        function _buildMonth(scope, start, month,calendarCtrl) {
            scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                scope.weeks.push({days: _buildWeek(date.clone(), month, scope,calendarCtrl)});
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }

        function _buildWeek(date, month, scope,calendarCtrl) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                var lastDayOfWeek = false;
                if (i == 6) {
                    lastDayOfWeek = true;
                }
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
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
            return days;
        }
    }]);
