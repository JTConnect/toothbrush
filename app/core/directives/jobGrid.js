(function() {
    angular.module('app')
        .directive("jobGrid", jobGrid);

    jobGrid.$inject = ['$timeout','$state'];

    function jobGrid() {
        return {
            restrict: "EA",
            scope: {jobs: "=", text: "=", title: "=" },
            bindToController: true,
            templateUrl: 'app/core/templates/job.html',
            controller: myController,
            controllerAs: "vm"
        };

        function myController($state) {
            var vm = this;

            vm.navigate = function (obj) {
                if(!obj || !obj.jobpostingid) return;
                $state.go('root.appLayout.view', {id: obj.jobpostingid});
            }
        }
    }

})();