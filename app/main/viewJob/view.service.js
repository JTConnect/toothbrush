(function() {
    angular
        .module('app')
        .factory('ViewService', ViewService);

    ViewService.$inject = ['HttpRequestService'];

    function ViewService(HttpRequestService) {
        var self = this;

        return {
            GetJob: getJob
        };

        /*API Services*/

        function getJob(id) {
            return HttpRequestService.Go(
                {
                    url: "https://resourceserver.herokuapp.com/api/job/getJobPost/" + id,
                    //url: "http://localhost:3050/api/job/getJobPost/" + id,
                    method: "GET"
                });
        }


    }

})();