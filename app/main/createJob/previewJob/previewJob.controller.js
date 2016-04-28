(function() {
    angular
        .module('app')
        .controller('PreviewJobController', PreviewJobController);

    PreviewJobController.$inject = ['CreateJobService', '$state'];

    function PreviewJobController(CreateJobService,$state) {
        var vm = this;
        vm.message = "Perfect! Last Step";
        vm.previewJob = CreateJobService.GetJobPosting();

        activate();
        function activate() {
            //redirect user if job posting is null
            if(vm.previewJob == null || vm.previewJob == undefined) {$state.go('root.appLayout.createJob.postAJob'); }
            iLink(vm.previewJob.CompanyUrl);
        }
        function iLink(url){ 
            var createLink = 'http://' + url; 
            document.getElementById('clickableUrl').innerHTML += '<a href="'+ createLink +'">' + url +'</a>'; 
            vm.previewJob.CompanyUrl = createLink; 
        }
    }
})();