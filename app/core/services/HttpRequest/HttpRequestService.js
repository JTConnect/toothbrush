
(function() {
    angular
        .module('app')
        .factory('HttpRequestService', HttpRequestService);

    HttpRequestService.$inject = ['$q', '$http'];

    function HttpRequestService($q, $http) {

        return {
            Go: go
        }

        function go(config) {
            var deferred = $q.defer();
            $http(config)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    }

})();