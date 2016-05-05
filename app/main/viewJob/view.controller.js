(function() {

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$state', '$window', 'ViewService'];

    function ViewController($state, $window, ViewService) {
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
                vm.jobView = data;
                setTweetThisJobUrl(vm.jobView);
            });
        }

        function setJobId(id) {
            vm.jobId = id;
        }

        function getJobId() {
            return vm.jobId;
        }

        function getEncodedPageUrl() {
            return encodeURIComponent($window.location.href);
        }

        function getTwitterTweetUrl() {
            return "https://twitter.com/intent/tweet";
        }

        function getTwitterTweetRelated() {
            return "?related=iheartremotework,glicho_";
        }

        function getTwitterTweetText(value) {
            return "&text=" + value.companyname + " is now hiring a " + value.jobtitle + "!";
        }

        function setTweetThisJobUrl(job) {
            var twitterTweetDomain = getTwitterTweetUrl();
            var related = getTwitterTweetRelated();
            var text = getTwitterTweetText(job);
            var url = "&url=" + getEncodedPageUrl();

            vm.twitterTweetUrl = twitterTweetDomain + related + text + url;
        }
    }
})();