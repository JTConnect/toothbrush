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
            if (!route) return;
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

        vm.design = [
            {CompanyName: "London Arts", JobTitle: "Lead Designer", DatePosted: "Apr 23"},
            {CompanyName: "London Arts", JobTitle: "Lead Designer", DatePosted: "Apr 23"},
            {CompanyName: "London Arts", JobTitle: "Lead Designer", DatePosted: "Apr 23"},
            {CompanyName: "London Arts", JobTitle: "Lead Designer", DatePosted: "Apr 23"},
            {CompanyName: "London Arts", JobTitle: "Lead Designer", DatePosted: "Apr 23"},
            {CompanyName: "London Arts", JobTitle: "Lead Designer", DatePosted: "Apr 23"},
            {CompanyName: "London Arts", JobTitle: "Lead Designer", DatePosted: "Apr 23"},
            {CompanyName: "London Arts", JobTitle: "Lead Designer", DatePosted: "Apr 23"}
        ];

        vm.sysAdmin = [
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"}
        ];

        vm.customerSupport = [
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"}
        ];


        vm.copyWriting = [
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"}
        ];


        vm.marketing = [
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"}
        ];

        vm.management = [
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"}
        ];


        vm.other = [
            {CompanyName: "Flights", JobTitle: "Make-up artists", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Sculptures", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Musician", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Computer Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "Database Admin", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "IT Tech", DatePosted: "Apr 23"},
            {CompanyName: "Flights", JobTitle: "A+ Hardware certified", DatePosted: "Apr 23"}
        ];





    }


})();