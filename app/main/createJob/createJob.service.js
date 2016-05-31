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
            GetJobPosting: getJobPostingFromStorage,
            PersistJobPost: persistJobPost
        };

        /*API Services*/

        function getCategories() {
            return HttpRequestService.Go(
                {
                    url: "https://resourceserver.herokuapp.com/api/job/getcategories",
                    //url: "http://localhost:3050/api/job/getcategories",
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

        function persistJobPost(jobObject) {
            var jobPostingObject = {
                title: jobObject.JobTitle,
                categoryid: jobObject.CategoryID,
                description: jobObject.JobDescription,
                howtoapply: jobObject.HtmlStringApply,
                feature: jobObject.isFeatured,
                company: {name: jobObject.CompanyName, url: jobObject.CompanyUrl, email: jobObject.CompanyEmail, companylogo : jobObject.CompanyLogo, location: jobObject.CompanyLocation},
                payment: {days: 30, token: jobObject.token}
            };

            return HttpRequestService.Go({
                method: 'POST',
                url: 'https://resourceserver.herokuapp.com/api/job/updateJob',
                //url: 'http://localhost:3050/api/job/updateJob',
                data: jobPostingObject
            });
        }
    }
})();