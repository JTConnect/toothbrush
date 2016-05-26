(function() {
    angular
        .module('app')
        .controller('PayJobController', PayJobController);

    PayJobController.$inject = ['CreateJobService', 'PaymentService', '$state', '$scope', '$timeout'];

    function PayJobController(CreateJobService, PaymentService, $state, $scope, $timeout) {
        var vm = this;

        vm.message = "Perfect! Last Step";

        vm.ProcessJobPayment = processJobPayment;

        function processJobPayment() {
            vm.paymentSubmitObject.showErrorMessage = false;
            vm.submitButtonText = vm.paymentSubmitObject.loadingText;

            vm.submitted = true;

            if(vm.paymentForm.$invalid) {
                vm.submitButtonText = "Post Your Job!";
                return;
            }

            PaymentService.PostPayment(vm.cardObject, paymentCallback);

            function paymentCallback(err, result) {
                if(err) {
                    ShowError(err.errorMessage);
                }else {
                    var jobObject = getJobPostingObject();
                    jobObject.CompanyLogo = (jobObject.CompanyLogo == "/content/images/DefaultLogo.png") ? "" : jobObject.CompanyLogo;

                    console.log(jobObject.CompanyLogo);
                    console.log('Posted above');

                    jobObject.token = result.token;

                    //placeholder need feature property set at create job job
                    jobObject.Feature = false;

                    var jobPromise = CreateJobService.PersistJobPost(jobObject);

                    jobPromise.then(function(result) {
                        CreateJobService.SaveJobPosting(null);

                        vm.submitButtonText = "Success, Job has been Posted!";

                        $timeout(function() {
                            $state.go('root.home');
                        }, 1000);

                    }).catch(function(err) {
                        ShowError(err.errorMessage);
                    });
                }
            }
        }

        function ShowError(errMessage) {
            if(['$digest', '$apply'].indexOf($scope.$root.$$phase) == -1) {
                run();
                $scope.$apply();
            }else {
                $scope.$eval(run());
            }

            function run() {
                vm.paymentSubmitObject.errorMessage = errMessage;
                vm.paymentSubmitObject.showErrorMessage = true;
                vm.submitButtonText = "Post Your Job!";
            }
        }

        function getJobPostingObject() {
            if(!vm.jobPost) vm.jobPost = CreateJobService.GetJobPosting();
            return vm.jobPost;
        }

        function activate() {
            if(!getJobPostingObject()) $state.go('root.appLayout.createJob.postAJob');

            vm.cardObject = {};

            vm.submitButtonText = "Post Your Job!";
            vm.paymentSubmitObject = {loading: false, loadingText: 'Posting Job...', showErrorMessage: false};
        }

        activate();
    }

})();