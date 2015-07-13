/**
 * Created by synerzip on 09/07/15.
 */
angular.module("ui-calendar", [])
    .directive("calendarUi", [function () {
        return {
            restrict: 'E',
            scope: {
                selected: "=",
                defaultView:"@"
            },
            controller: function($scope) {
                this.nextNew = function() {
                    $scope.todayAvailable = 'Ashish';
                }
            },
            transclude:true,
            templateUrl: '/scripts/directives/templates/calendar.html',
            link: function (scope) {
                if(scope.defaultView){
                    scope.selectedView = scope.defaultView;
                }else{
                    scope.selectedView = 'month';
                }

                scope.day = scope.selected || moment();
                scope.selected = _removeTime(scope.selected || moment());
                scope.month = scope.selected.clone();


                var start = scope.selected.clone();
                start.date(1);
                _removeTime(start.day(0));

                _buildMonth(scope, start, scope.month);

                scope.select = function (day) {
                    scope.selected = day.date;
                };

                scope.next = function () {
                    scope.todayAvailable = false;
                    var next = scope.month.clone();
                    _removeTime(next.month(next.month() + 1).date(1));
                    scope.month.month(scope.month.month() + 1);
                    _buildMonth(scope, next, scope.month);

                    //For Day View
                    if(scope.selectedView == 'day') {
                        scope.day.add(1, "day");
                    }else{
                        //scope.day =  scope.weeks[0].days[0];
                    }
                };

                scope.previous = function () {
                    scope.todayAvailable = false;
                    var previous = scope.month.clone();
                    _removeTime(previous.month(previous.month() - 1).date(1));
                    scope.month.month(scope.month.month() - 1);
                    _buildMonth(scope, previous, scope.month);

                    if(scope.selectedView == 'day') {
                        scope.day.subtract(1, "day");
                    }else{
                        //scope.day =  scope.weeks[0].days[0];
                    }
                };

                scope.gotoToday = function () {

                    scope.todayAvailable = true;
                    scope.month = moment().clone();

                    var start = moment().clone();
                    start.date(1);
                    _removeTime(start.day(0));

                    _buildMonth(scope, start, scope.month);
                };

                scope.selectView = function(view){
                    scope.selectedView = view;
                };


            },


        };

        function _removeTime(date) {
            return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }

        function _buildMonth(scope, start, month) {
            scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                scope.weeks.push({days: _buildWeek(date.clone(), month, scope)});
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }

        function _buildWeek(date, month, scope) {
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
                    scope.todayAvailable = true;
                }
                date.add(1, "d");
            }
            return days;
        }
    }]);
