(function() {

    angular
        .module('app')
        .factory('ParseTextService', ParseTextService);

        ParseTextService.$inject = [];

        function ParseTextService() {
            return {
                convertToLinks: convertToLinks
            }

            function convertToLinks(text) {
                var urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, function(url) {
                    return '<a target="_blank" href="' + url + '">' + url + '</a>';
                });
            }
        }
})();
