(function() {
    angular
        .module('app')
        .controller('PostJobController', PostJobController);

    PostJobController.$inject = ['CreateJobService', '$state'];

    function PostJobController(CreateJobService, $state) {
        var vm = this;
        vm.newJobPosting = CreateJobService.GetJobPosting() || {};
        vm.categories = [];

        vm.PostJob = postJob;

        activate();
        function activate() {
            getCategories();

            editorName().document.designMode = 'On';

            if (vm.newJobPosting.JobDescription != null || vm.newJobPosting.JobDescription != undefined)
                editorName().document.body.innerHTML = vm.newJobPosting.JobDescription;
            else
                vm.newJobPosting.JobDescription = "";

            setFileOnChangeEventHandler();

            if(!getCompanyLogoUrl()) setCompanyLogoUrl("/content/images/DefaultLogo.png");
        }

        //Rich Text Editor Components here
        vm.boldIsActive = false;
        vm.italicIsActive = false;
        vm.underlineIsActive = false;
        vm.Italic = italic;
        vm.Bold = bold;
        vm.UnderLine = underline;
        vm.UnOrderedList = unOrderedList;
        vm.OrderedList = orderedList;
        vm.Link = link;
        vm.FontSize = fontSize;

        vm.fontSize = [{
            id: 12,
            value: "1" // show user 12 
        }, {
            id: 13,
            value: "2"
        }, {
            id: 14,
            value: "3"
        }, {
            id: 15,
            value: "4"
        }, {
            id:16,
            value: "5"
        }, {
            id: 17,
            value: "6"
        }, {
            id: 18,
            value: "7"
        }
        ];

        function fontSize() {
            focusArea();
            var size = vm.selectedSize;
            editorName().document.execCommand('FontSize', false, size);
        }
        function italic() {
            focusArea();
            vm.italicIsActive = !vm.italicIsActive;
            editorName().document.execCommand('italic', false, null);
        }
        function bold() {
            focusArea();
            vm.boldIsActive = !vm.boldIsActive;
            editorName().document.execCommand('bold', false, null);
        }
        function underline() {
            focusArea();
            vm.underlineIsActive = !vm.underlineIsActive;
            editorName().document.execCommand('underline', false, null);
        }
        function unOrderedList() {
            focusArea();
            editorName().document.execCommand('InsertUnOrderedList', false, "newUL");
        }
        function orderedList() {
            focusArea();
            editorName().document.execCommand('InsertOrderedList', false, "newOL");
        }
        function link() {
            var url = prompt("Enter the url you would like to add: ", "http://");
            editorName().document.execCommand('CreateLink', false, url);
        }
        function focusArea(){
            return document.getElementById("richTextField").contentWindow.document.body.focus();
        }
        function editorName() {
            return window.frames.richTextField;
        }
        function textAreaNameStr() {
            return "plainTextArea";
        }
        function postJob() {
            vm.submitted = true;
            if (vm.postForm.$invalid || vm.newJobPosting.CategoryID === undefined) return;

            var contents = document.getElementById("postForm");
            contents.elements[textAreaNameStr()].value = editorName().document.body.innerHTML;

            vm.newJobPosting.JobDescription = contents.elements[textAreaNameStr()].value;

            CreateJobService.SaveJobPosting(vm.newJobPosting);
            $state.go('root.appLayout.createJob.previewJob');
        }
        function getCategories() {
            console.log("start get categories");
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
            xhr.open("GET", "http://resourceserver.herokuapp.com/sign_s3?file_name="+ file.name + "&file_type="+file.type + "&bucketName=" + "iheartremotework");
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
    }
})();