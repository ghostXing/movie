(function (angular) {

    'use strict';
    angular.module('myApp.movie_detail', ['ngRoute', 'moviecat.service'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/subject/:id', {
                templateUrl: 'movie_detail/movie_detail.html',
                controller: 'View2Ctrl'
            });
        }])

        .controller('View2Ctrl', ["$scope", "$route", "$routeParams", "httpService","myAppConfig",
            function ($scope,$route, $routeParams, httpService,myAppConfig) {
                // $http({method:"GET",url:"/app/data.json"})
                //     .then(function successCallBack(response) {
                //         $scope.text = response.data.title;
                //         $scope.data = response.data;
                //     },function errorCallBack(error) {
                //         $scope.text = "页面错误"+error.status;
                //     });

                $scope.flag = false;
                $scope.title = "loading...";
                httpService.jsonp(myAppConfig.detail_link + $routeParams.id,
                    {},
                    function (data) {
                        $scope.flag = true;
                        $scope.title = data.title;
                        $scope.image = data.images.small;
                        $scope.summary = data.summary;
                        $scope.$apply();
                    });

                $scope.play = function (page) {
                    if (page >= 1 && page <= $scope.pageCount) {
                        $route.updateParams({page:page});
                    }
                };
            }]);

})(angular);