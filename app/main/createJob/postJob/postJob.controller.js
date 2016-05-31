(function() {
    angular
        .module('app')
        .controller('PostJobController', PostJobController);

    PostJobController.$inject = ['CreateJobService', '$state', 'ParseTextService'];

    function PostJobController(CreateJobService, $state, ParseTextService) {
        var vm = this;
        vm.categories = [];

        vm.PostJob = postJob;
        vm.IsNullOrEmpty = isNullOrEmpty;

        activate();
        function activate() {
            vm.newJobPosting = CreateJobService.GetJobPosting();
            if(!vm.newJobPosting) vm.newJobPosting = { isFeatured: false };

            getCategories();

            setFileOnChangeEventHandler();

            if(!getCompanyLogoUrl()) setCompanyLogoUrl("/content/images/DefaultLogo.png");
        }

        function postJob() {
            vm.submitted = true;
            if (vm.postForm.$invalid || vm.newJobPosting.CategoryID === undefined || isNullOrEmpty(vm.newJobPosting.JobDescription) ) return;

            vm.newJobPosting.HtmlStringApply = ParseTextService.convertToLinks(vm.newJobPosting.Apply);
            vm.newJobPosting.HtmlStringApply = ParseTextService.convertToMailLinks(vm.newJobPosting.HtmlStringApply);
            vm.newJobPosting.CompanyUrl = appendHttpToCompanyUrl(vm.newJobPosting.CompanyUrl);


            CreateJobService.SaveJobPosting(vm.newJobPosting);
            $state.go('root.appLayout.createJob.previewJob');
        }

        function isNullOrEmpty(value) {
            var result = (value == undefined || value == null || value.trim() == "");
            return result;
        }

        function getCategories() {
            CreateJobService.GetCategories().then(function (data) {
                vm.categories = data.data.rows;
            }).catch(function (err) {
                console.log(err);
            });
        }
        function setFileOnChangeEventHandler() {
            var fileInput = document.getElementById("companylogo_input");

            fileInput.onchange = function(){
                var files = document.getElementById("companylogo_input").files;
                var file = files[0];
                if(file == null){
                    alert("No file selected.");
                }
                else{
                    get_signed_request(file);
                }
            };
        }
        function get_signed_request(file){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://resourceserver.herokuapp.com/sign_s3?file_name="+ file.name + "&file_type="+file.type + "&bucketName=" + "iheartremotework");
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        var response = JSON.parse(xhr.responseText);
                        upload_file(file, response.signed_request, response.url);
                    }
                    else{
                        alert("Could not get signed URL.");
                    }
                }
            };
            xhr.send();
        }
        function upload_file(file, signed_request, url){
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", signed_request);
            xhr.setRequestHeader('x-amz-acl', 'public-read');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    document.getElementById("preview").src = url;
                    setCompanyLogoUrl(url);
                }
            };
            xhr.onerror = function() {
                alert("Could not upload file.");
            };
            xhr.send(file);
        }
        function setCompanyLogoUrl(url) {
            vm.newJobPosting.CompanyLogo = url;
        }
        function getCompanyLogoUrl() {
            return vm.newJobPosting.CompanyLogo;
        }

        function appendHttpToCompanyUrl(url) {
            if(!url) return;

            url = url.toLowerCase();

            var regExpression = new RegExp("^(http|https)://", "i");
            var match = regExpression.test(url);

            if(match) return url;

            return "http://" + url;
        }
    }
})();