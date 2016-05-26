(function() {
    angular
        .module('app')
        .controller('PreviewJobController', PreviewJobController);

    PreviewJobController.$inject = ['CreateJobService', '$state'];

    function PreviewJobController(CreateJobService,$state) {
        var vm = this;

        activate();

        function activate() {
            vm.message = "Perfect! Next";
            vm.previewJob = CreateJobService.GetJobPosting();
            vm.todaysDate = moment().format("MMM Do");

            if(!vm.previewJob) {$state.go('root.appLayout.createJob.postAJob'); }
        }
    }
})();