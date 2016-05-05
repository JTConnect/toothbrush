(function() {

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$state'];

    function ViewController($state,stateParams) {
        var vm = this;
        vm.jobId = undefined;

        vm.Navigate = navigate;

        function navigate(route) {
            if(!route) return;
            $state.go(route);
        }

        activate();

        function activate() {
            setUp();
        }

        function setUp() {
            var id = $state.params.id || undefined;
            setJobId(id);
            getJob();
        }

        function getJob() {
            console.log(getJobId());
        }


        function setJobId(id) {
            vm.jobId = id;
        }

        function getJobId() {
            return vm.jobId;
        }



    }


})();