(function() {

    angular
        .module('app')
        .factory('ParseTextService', ParseTextService);

        ParseTextService.$inject = [];

        function ParseTextService() {
            return {
                convertToLinks: convertToLinks,
                convertToMailLinks : convertToMailLinks
            }

            function convertToLinks(text) {
                var urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, function(url) {
                    return '<a target="_blank" href="' + url + '">' + url + '</a>';
                });
            }

            function convertToMailLinks(text) {
                var mailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
                return text.replace(mailRegex, function(mail) {
                   return '<a href="mailto:' + mail + '">' + mail +  '</a>';
                });
            }
        }
})();
