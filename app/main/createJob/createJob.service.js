(function() {
    angular
        .module('app')
        .factory('CreateJobService', CreateJobService);

    CreateJobService.$inject = ['localStorageService', 'HttpRequestService'];

    function CreateJobService(localStorageService, HttpRequestService) {
        var self = this;

        return {
            GetCategories: getCategories,
            SaveJobPosting: saveJobPostingInStorage,
            GetJobPosting: getJobPostingFromStorage
        };

        /*API Services*/

        function getCategories() {
            return HttpRequestService.Go(
                {
                    url: "https://resourceserver.herokuapp.com/api/job/getcategories",
                    method: "GET"
                });
        }

        /*App Logic*/
        function saveJobPostingInStorage(data) {
            localStorageService.set("GlichoJobPosting", data);
        }

        function getJobPostingFromStorage() {
            return localStorageService.get("GlichoJobPosting");
        }
    }
})();