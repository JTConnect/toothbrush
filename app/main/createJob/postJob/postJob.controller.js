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

            if(vm.newJobPosting.JobDescription != null || vm.newJobPosting.JobDescription != undefined)
               editorName().document.body.innerHTML =  vm.newJobPosting.JobDescription;
            else
                vm.newJobPosting.JobDescription = "";

        }

        //Rich Text Editor Components here
        vm.Italic = italic; 
        vm.Bold = bold; 
        vm.UnderLine = underline; 
        vm.UnOrderedList = unOrderedList; 
        vm.OrderedList = orderedList; 
        vm.Link = link; 
        vm.FontSize = fontSize;

        vm.fontSize = [{ 
            id:12, 
            value: "1" // show user 12 
        }, { 
            id:13, 
            value: "2" 
        }, { 
            id:14, 
            value: "3" 
        }, { 
            id:15, 
            value: "4" 
        }, { 
            id:16, 
            value: "5" 
        }, { 
            id:17, 
            value: "6" 
        }, { 
            id:18, 
            value: "7" 
        }];

        function fontSize(){ 
            var size = vm.selectedSize;
            editorName().document.execCommand('FontSize', false,size); 
        } 
        function italic(){ 
            editorName().document.execCommand('italic',false,null); 
        } 
        function bold(){
            editorName().document.execCommand('bold',false,null); 
        } 
        function underline(){
            editorName().document.execCommand('underline',false,null); 
        } 
        function unOrderedList(){
            editorName().document.execCommand('InsertUnOrderedList',false,"newUL"); 
        } 
        function orderedList(){
            editorName().document.execCommand('InsertOrderedList',false,"newOL"); 
        } 
        function link(){ 
            var url = prompt("Enter the url you would like to add: ", "http://");
            editorName().document.execCommand('CreateLink', false,url); 
        }

        function editorName (){
            return window.frames.richTextField;
        }
        function textAreaNameStr(){
            return "myTextArea";
        }

        function postJob() {
            vm.submitted = true;
            if(vm.postForm.$invalid || vm.newJobPosting.CategoryID === undefined) return;

            var contents = document.getElementById("postForm"); 
            contents.elements[textAreaNameStr()].value = editorName().document.body.innerHTML;

            vm.newJobPosting.JobDescription = contents.elements[textAreaNameStr()].value;

            CreateJobService.SaveJobPosting(vm.newJobPosting);
            $state.go('root.appLayout.createJob.previewJob');
        }

        function getCategories() {
            console.log("start get categories");
            CreateJobService.GetCategories().then(function(data) {
                vm.categories = data.data.rows;
            }).catch(function(err) {
               console.log(err);
            });
        }
    }
})();