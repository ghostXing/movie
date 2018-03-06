(function (angular) {
    angular.module("moviecat.service",[])

         .service("httpService",["$document","$window",function ($document,$window) {
             this.jsonp = function (src,obj,callback) {
               //1.处理url地址
               var url = src.indexOf("?") === -1 ? src + "?" : src;
               var queryString = "";
               for( var key in obj) {
                   queryString += key + "=" + obj[key] + "&";
               }
               var cbk = "json_http_s" + Math.random().toString().replace(".","");
               var cb = "callback" + "=" + cbk;
               url += queryString + cb;
               //2创建script标签
                 var scriptElement = $document[0].createElement("script");
                 scriptElement.src = url;
                 console.log(url);
                 //3挂载回调函数
                 $window[cbk] = function (data) {
                     callback(data);
                    $document[0].body.removeChild(scriptElement);
                 };
                 //4将script放入html
                 console.log($document);
                 $document[0].body.appendChild(scriptElement);
             };
        }])

})(angular);