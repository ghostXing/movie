'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.movie_detail',
    'myApp.movie_list',
    'myApp.version',
    'moviecat.directives_auto_focus'

])
    //储存一些常量值
    .constant("myAppConfig",{
        movie_link:"https://api.douban.com/v2/movie/",
        detail_link:"https://api.douban.com/v2/movie/subject/",
        count:10
    })
    //配置路由
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
    }])
    //配置组模块的控制器
    .controller("moviecat.search",["$scope","$route","$location",function ($scope,$route,$location) {
        $scope.content = "Search...";
        $scope.search = function () {
            if($location.path().startsWith("/subject")) {
                console.log($location.url());
                // /subject/1307914
                $location.url("/search/1?q=" + $scope.content );
            } else {
                $route.updateParams({category: "search", q: $scope.content});
            }
        };
    }]);

// .controller("DemoController", ["$scope", "$location", function ($scope, $location) {
//   $scope.location = $location;
//   $scope.$watch("location.path()",function (now,old) {
//       console.log(now);
//       if(now.startsWith("/in_theaters")) {
//           $scope.type = "/in_theaters";
//       } else if(now.startsWith("/coming_soon")) {
//           $scope.type = "/coming_soon";
//       } else {
//           $scope.type = "/top250";
//       };
//   });
// }]);


