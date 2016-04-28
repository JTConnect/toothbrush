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
            richTextField.document.designMode = 'On';
            //The code below gets the value of vm.newJobPosting.JobDescription and enters it into the iFrame
            var contents = document.getElementById("vm.postForm");
            window.frames["richTextField"].document.body.innerHTML = vm.newJobPosting.JobDescription;
        }

        //Rich Text Editor Components here
        vm.Italic = italic;
        vm.IBold = iBold;
        vm.IUnderLine = iUnderline;
        vm.IUnOrderedList = iUnOrderedList;
        vm.IOrderedList = iOrderedList;
        vm.ILink = iLink;
        vm.IFontSize = iFontSize;

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

        function iFontSize(){
            var size = vm.selectedSize;
            richTextField.document.execCommand('FontSize', false,size);
        }
        function italic(){
            richTextField.document.execCommand('italic',false,null);
        }
        function iBold(){
            richTextField.document.execCommand('bold',false,null);
        }
        function iUnderline(){
            richTextField.document.execCommand('underline',false,null);
        }
        function iUnOrderedList(){
            richTextField.document.execCommand('InsertUnOrderedList',false,"newUL");
        }
        function iOrderedList(){
            richTextField.document.execCommand('InsertOrderedList',false,"newOL");
        }
        function iLink(){
            var url = prompt("Enter the url you would like to add: ", "http://");
            richTextField.document.execCommand('CreateLink', false,url);
        }

        function postJob() {
            vm.submitted = true;
           // if(vm.postForm.$invalid || vm.newJobPosting.CategoryID === undefined) return;

            var contents = document.getElementById("vm.postForm");
            contents.elements["myTextArea"].value = window.frames["richTextField"].document.body.innerHTML;

            vm.newJobPosting.JobDescription = contents.elements["myTextArea"].value;
            
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