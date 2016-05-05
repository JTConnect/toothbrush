(function() {

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$state','ViewService'];

    function ViewController($state, ViewService) {
        var vm = this;
        vm.jobId = undefined;
        vm.jobView = undefined;

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
            ViewService.GetJob(getJobId()).then(function(data) {
                console.log(data);
                vm.jobView = data;
            });
        }


        function setJobId(id) {
            vm.jobId = id;
        }

        function getJobId() {
            return vm.jobId;
        }



    }


})();