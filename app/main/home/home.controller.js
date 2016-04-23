(function() {
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state'];

    function HomeController($state) {
        var vm = this;

        vm.NavigateTo = navigateTo;

        activate();
        function activate() {
           setUp();
        }

        function navigateTo(route) {
            if(!route) return;
            $state.go('root.appLayout.createJob.postAJob');
        }

        function setUp() {
            vm.programming = [{CompanyName: "Walmart", JobTitle: "Senior Executive", DatePosted: "Apr 23"},
                {CompanyName: "Walmart", JobTitle: "Senior Executive", DatePosted: "Apr 23"},
                {CompanyName: "Walmart", JobTitle: "Senior Executive", DatePosted: "Apr 23"},
                {CompanyName: "Walmart", JobTitle: "Senior Executive", DatePosted: "Apr 23"},
                {CompanyName: "Walmart", JobTitle: "Senior Executive", DatePosted: "Apr 23"},
                {CompanyName: "Walmart", JobTitle: "Senior Executive", DatePosted: "01/22/2015"},
                {CompanyName: "Walmart", JobTitle: "Senior Executive", DatePosted: "01/22/2015"},
                {CompanyName: "Walmart", JobTitle: "Senior Executive", DatePosted: "01/22/2015"},];
        }

    }


})();