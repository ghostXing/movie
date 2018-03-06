(function (angular) {
    angular.module("moviecat.directives_auto_focus",[])
        .directive("autoFocus",["$location",function ($location) {
            // var path = $location.path();
            return {
                restrict: "A",
                link: function ($scope,iElm,iAttrs,controller) {
                    // #/in_theaters/1
                    $scope.$location = $location;
                    $scope.$watch("$location.path()",function (now) {
                        var ahref = iElm.children().attr("href");
                        var type = ahref.replace(/#(\/.*)\/\d+/,"$1");
                        if(now.startsWith(type)) {
                            iElm.parent().children().removeClass("active");
                            iElm.addClass("active");
                        }
                    });
                    // iElm.on("click",function () {
                    //     var iElms = iElm.parent().children();
                    //     iElms.removeClass("active");
                    //     iElm.addClass("active");
                    // });
                }
            }
        }])
})(angular);