(function() {
    angular.module('app')
        .directive("jobGrid", jobGrid);

    jobGrid.$inject = [];

    function jobGrid() {
        return {
            restrict: "EA",
            scope: {jobs: "=", text: "=", title: "=" },
            bindToController: true,
            templateUrl: 'app/core/templates/job.html',
            controller: myController,
            controllerAs: "vm"
        };

        function myController() {}
    }

})();