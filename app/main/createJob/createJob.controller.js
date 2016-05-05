(function() {
    angular
        .module('app')
        .controller('CreateJobController', CreateJobController);

    CreateJobController.$inject = ['$state'];

    function CreateJobController($state) {
        var vm = this;
        vm.state = $state;

        activate();
        function activate() {}
    }

})();