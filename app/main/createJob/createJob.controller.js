(function() {
    angular
        .module('app')
        .controller('CreateJobController', CreateJobController);

    CreateJobController.$inject = ['$state'];

    function CreateJobController($state) {
        var vm = this;
        vm.state = $state;

        console.log(vm.state.is('root.appLayout.createJob.postAJob'));

        activate();
        function activate() {}
    }

})();