(function() {
    angular
        .module('app')
        .controller('PreviewJobController', PreviewJobController);

    PreviewJobController.$inject = ['CreateJobService', '$state'];

    function PreviewJobController(CreateJobService,$state) {
        var vm = this;

        activate();

        function activate() {
            vm.message = "Perfect! Last Step";
            vm.previewJob = CreateJobService.GetJobPosting();

            if(!vm.previewJob) {$state.go('root.appLayout.createJob.postAJob'); }

            vm.previewJob.CompanyUrl = "http://" + vm.previewJob.CompanyUrl;
        }
    }
})();