(function (angular) {

    'use strict';
    angular.module('myApp.movie_list', ['ngRoute', 'moviecat.service'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/:category/:page', {
                templateUrl: 'app/movie_list/movie_list.html',
                controller: 'View1Ctrl'
            });
        }])

        .controller('View1Ctrl', ["$scope", "$route", "$routeParams", "httpService","myAppConfig",
            function ($scope,$route, $routeParams, httpService,myAppConfig) {
                // $http({method:"GET",url:"/app/data.json"})
                //     .then(function successCallBack(response) {
                //         $scope.text = response.data.title;
                //         $scope.data = response.data;
                //     },function errorCallBack(error) {
                //         $scope.text = "页面错误"+error.status;
                //     });
                var count = myAppConfig.count;
                var page = $routeParams.page;
                var category =  $routeParams.category;
                $scope.currentPage = parseInt(page);
                var start = (page - 1) * count;
                $scope.flag = false;
                $scope.title = "loading...";
                httpService.jsonp(myAppConfig.movie_link + category,
                    {start: start, count: count, q: $routeParams.q},
                    function (data) {
                        $scope.data = data;
                        console.log(data);
                        $scope.title = data.title;
                        $scope.total = data.total;
                        $scope.pageCount = Math.ceil($scope.total / count);
                        $scope.flag = true;
                        $scope.$apply();
                    });

                $scope.play = function (page) {
                    if (page >= 1 && page <= $scope.pageCount) {
                        $route.updateParams({page:page});
                    }
                };
            }]);

})(angular);
