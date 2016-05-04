(function() {
    'use strict';

    angular
        .module('app')
        .factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = ['HttpRequestService'];

    function HomeFactory(HttpRequestService) {

        return {
            GetJobPostings : GetJobPostings
        }

        function GetJobPostings() {
            return HttpRequestService.Go({
                url : "https://resourceserver.herokuapp.com/api/job/getJobPostings",
                method : "GET"
            });
        }
    }
})();
