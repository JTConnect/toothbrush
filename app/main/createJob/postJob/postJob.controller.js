(function() {
    angular
        .module('app')
        .controller('PostJobController', PostJobController);

    PostJobController.$inject = ['CreateJobService', '$state'];

    function PostJobController(CreateJobService, $state) {
        var vm = this;
        vm.newJobPosting = CreateJobService.GetJobPosting() || {};
        vm.categories = [];

        vm.PostJob = postJob;

        activate();
        function activate() {
            getCategories();
        }

        function postJob() {
            vm.submitted = true;
            if(vm.postForm.$invalid || vm.newJobPosting.CategoryID === undefined) return;

            CreateJobService.SaveJobPosting(vm.newJobPosting);
            $state.go('root.appLayout.createJob.previewJob');
        }

        function getCategories() {
            console.log("start get categories");
            CreateJobService.GetCategories().then(function(data) {
                vm.categories = data.data.rows;
            }).catch(function(err) {
               console.log(err);
            });
        }
    }
})();