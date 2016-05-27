(function() {
    angular
        .module('app')
        .config(config);

        function config($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('', '/home');

            $stateProvider
                .state('root', {
                    url: '',
                    templateUrl: 'app/main/rootLayout/rootLayout.html',
                    controller: 'RootLayoutController',
                    controllerAs: 'vm'
                })

                .state('root.home', {
                    url: '/home',
                    templateUrl: 'app/main/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                })

                .state('root.appLayout', {
                    url: '/app',
                    templateUrl: 'app/main/appLayout/appLayout.html',
                    controller: 'AppLayoutController',
                    controllerAs: 'vm'
                })


                .state('root.appLayout.createJob', {
                    url: '/createjob',
                    templateUrl: 'app/main/createJob/createJob.html',
                    controller: 'CreateJobController',
                    controllerAs: 'vm'
                })

                .state('root.appLayout.createJob.postAJob', {
                    url: '/postjob',
                    templateUrl: 'app/main/createJob/postJob/postJob.html',
                    controller: 'PostJobController',
                    controllerAs: 'vm'
                })

                .state('root.appLayout.createJob.previewJob', {
                    url: '/preview',
                    templateUrl: 'app/main/createJob/previewJob/previewJob.html',
                    controller: 'PreviewJobController',
                    controllerAs: 'vm'
                })

                .state('root.appLayout.createJob.payJobPost', {
                    url: '/pay',
                    templateUrl: 'app/main/createJob/payJob/payJob.html',
                    controller: 'PayJobController',
                    controllerAs: 'vm'
                })

                .state('root.appLayout.view', {
                    url: '/view/:id',
                    templateUrl: 'app/main/viewJob/view.html',
                    controller: 'ViewController',
                    controllerAs: 'vm'
                })

                .state('root.appLayout.contact', {
                    url: '/contact',
                    templateUrl: 'app/main/contact/contact.html',
                    controller: 'ContactController',
                    controllerAs: 'vm'
                });
        }
})();
