(function() {
    angular
        .module('app')
        .controller('PayJobController', PayJobController);

    PayJobController.$inject = ['CreateJobService', '$state'];

    function PayJobController(CreateJobService,$state) {
        var vm = this;
        vm.message = "Perfect! Last Step";
        vm.jobPost = CreateJobService.GetJobPosting();

        vm.ProcessJobPayment = processJobPayment;

        activate();
        function activate() {
            if(vm.jobPost == null || vm.jobPost == undefined) {$state.go('root.appLayout.createJob.postAJob'); }
        }

        function processJobPayment() {
            vm.submitted = true;
            if(vm.paymentForm.$invalid) return;
        }

    }

})();