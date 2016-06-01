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

                    jobObject.token = result.token;

                    //placeholder need feature property set at create job job
                    jobObject.Feature = false;

                    var jobPromise = CreateJobService.PersistJobPost(jobObject);

                    jobPromise.then(function(result) {
                        CreateJobService.SaveJobPosting(null);

                        vm.submitButtonText = "Success, Job has been Posted!";

                        $timeout(function() {
                            $state.go('root.home');
                        }, 500);

                    }).catch(function(err) {
                        var errorMessage = err;

                        if(errorMessage.indexOf('confirmationid ') > -1) {
                            ShowError('Your card has been charged, and your job post is now live on our site for 30 days. ' +
                            'However, the confirmation email was not sent due to an invalid company email address. Please ' +
                            'keep a record of your confirmation id, which is ' + errorMessage.split(' ')[1].trim() + '. If you do ' +
                            'have any questions, please do get in contact with us!');

                            CreateJobService.SaveJobPosting(null);

                        }else if(errorMessage.indexOf('Stripe') > -1) {
                            var message = "Verify you have entered a valid Card, Expiration, Year and CVC number.";
                            ShowError(message);
                        } else {
                            ShowError(err);
                        }
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