(function() {
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'HomeFactory'];

    function HomeController($state, HomeFactory) {
        var vm = this;

        vm.NavigateTo = navigateTo;
        vm.Go = Go;

        activate();
        function activate() {
            setUp();
        }

        function navigateTo(route) {
            if (!route) return;
            $state.go('root.appLayout.createJob.postAJob');
        }

        function Go(state) {
            $state.go(state);
        }

        function setUp() {
            vm.loadingJobs = true;

            HomeFactory.GetJobPostings().then(function(data) {
                var jobObject = data.data.rows;

                if(!jobObject) return;

                vm.programming = jobObject.programming;
                vm.design = jobObject.design;
                vm.devOpsSysadmin = jobObject.devOpsSysadmin;
                vm.copyWriting = jobObject.copyWriting;
                vm.customerSupport = jobObject.customerSupport;
                vm.other = jobObject.other;
                vm.businessAndManagement = jobObject.businessAndManagement;

                vm.loadingJobs = false;
            }).catch(function(err) {
                vm.loadingJobs = false;
            });
        }
    }
})();