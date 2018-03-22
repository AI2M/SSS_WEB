
var app = angular.module("SSS", ['datatables']);

app.controller('AddMusicCtrl', AddMusicCtrl);
function AddMusicCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope, fileUploadService) {
    $scope.editMode = false;
    $scope.addMode = false;
    $scope.image_url = "";
    var file;
    var file2;
    $scope.filename = "Choose picture";
    $scope.filename2 = "Choose music";

    $scope.loadData = function () {
        $http.get("http://localhost/SSS_web_api/getMusicBoxData.php")
            .then(function successCallback(response) {
                console.log(response);
                $scope.musicboxs = response.data.musicboxs;
                $scope.selectedMusicBox = $scope.musicboxs[0];
                $scope.image_url = undefined;
                $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/music_pic"
                +$scope.selectedMusicBox.music_box_id+".jpg"
            }, function errorCallback(response) {
                console.log(response);
            });
    }
    $scope.loadData();

    $scope.selectMusicBox = function (index) {
        $scope.selectedMusicBox = $scope.musicboxs[index];
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/music_pic"
                +$scope.selectedMusicBox.music_box_id+".jpg"
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
    }

    $scope.saveMusic = function () {
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
        $scope.editMode = !$scope.editMode;
        var musicboxData = $scope.selectedMusicBox;
        if ($scope.addMode) {
            //addmode

            if($scope.myFile!=undefined && $scope.myFile2!=undefined){
                $http({
                    method: 'POST',
                    url: 'http://localhost/SSS_web_api/postMusicBoxData.php',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: musicboxData,
                })
                    .then(function successCallback(response) {
                        console.log(response);
                        if (response.data.error == true) {
                            $scope.loadData();
                            $scope.errorMessage = "Error,Please enter all information";
                            
                        }
                        else {
                            $scope.uploadFile();
                            $scope.loadData();
                            $scope.addMessage = "Succesfully added";
                            
                        }
    
                    }, function errorCallback(response) {
                        console.log(response);
                        $scope.errorMessage = "Error,Please try again";
                    });

            }
            else{
                $scope.errorMessage = "Error,Please choose picture and music";
                $scope.selectedMusicBox = $scope.musicboxs[0];
                $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/music_pic"
                +$scope.selectedMusicBox.music_box_id+".jpg"
            }
           
            $scope.addMode = false;
        }
        else {
            //savemode
            $http({
                method: 'POST',
                url: 'http://localhost/SSS_web_api/putMusicBoxData.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: musicboxData,
            })
                .then(function successCallback(response) {
                    console.log(response);
                    if (response.data.error == true) {
                        $scope.loadData();
                        $scope.errorMessage = "Error,Please enter all information";
                    }
                    else {
                        $scope.uploadFile();
                        $scope.loadData();
                        $scope.addMessage = "Succesfully updated";
                    }

                }, function errorCallback(response) {
                    console.log(response);
                    $scope.errorMessage = "Error,Please try again";
                });
            $scope.addMode = false;
        }
        $scope.filename = "Choose picture";
        $scope.filename2 = "Choose music";
    }

    $scope.deleteMusic = function () {
        var musicboxData = $scope.selectedMusicBox;
        $http.delete("http://localhost/SSS_web_api/deleteMusicBoxData.php/?music_box_id=" + musicboxData.music_box_id)
            .then(function successCallback(response) {
                console.log(response);
                $scope.loadData();
                $scope.successMessage = "Deleted";
            }, function errorCallback(response) {
                console.log(response);
                $scope.errorMessage = "Error,Please try again";
            });

    }

    $scope.toggleEditMode = function () {
        $scope.editMode = !$scope.editMode;
        $scope.addMode = false;
    }

    $scope.addMusicbox = function () {
        $scope.addMode = true;
        $scope.selectedMusicBox = {
           // "id": new Date().toTimeString()
        };
        $scope.editMode = true;
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/noimage.jpg";
    }

    $scope.cancel = function () {
        $scope.toggleEditMode();
        $scope.myFile = undefined;
        $scope.myFile2 = undefined;
        $scope.filename = "Choose picture";
        $scope.filename2 = "Choose music";
        $scope.selectedMusicBox = $scope.musicboxs[0];
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/music_pic"
        +$scope.selectedMusicBox.music_box_id+".jpg"
    }
    //datatable
    var vm = this;
    vm.newPromise = newPromise;
    vm.reloadData = reloadData;
    vm.dtInstance = {};
    vm.message = ' ';
    vm.someClickHandler = someClickHandler;

    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
        var datain = "";
        var defer = $q.defer();
        // var data = {'url' : 'http://139.59.251.210/api-prevent/ajax/getallrounds'};
        // $http.get('http://l-lin.github.io/angular-datatables/archives/data.json')

        $http({
            method: 'GET',
            url: 'http://localhost/SSS_web_api/getMusicBoxData.php',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // data: data,
        })
            .then(function (result) {
                // console.log(result.data);
                var datain = angular.fromJson(result.data.musicboxs);
                // // console.log(datain);
                defer.resolve(datain);
                // defer.resolve(result.data);
            });
        return defer.promise;
    })
        // vm.dtOptions = DTOptionsBuilder.fromSource('http://l-lin.github.io/angular-datatables/archives/data.json')
        .withPaginationType('full')
        // Active Responsive plugin
        .withOption('responsive', true)
        .withOption('rowCallback', rowCallback);



    vm.dtColumns = [
        DTColumnBuilder.newColumn('music_box_id').withTitle('Music Box ID'),
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('price').withTitle('Price'),
        DTColumnBuilder.newColumn('detail').notSortable().withTitle('Detail'),
    ];
    // $interval(function() {
    // 	vm.dtInstance.changeData(vm.newPromise());
    // }, 300000);

    function newPromise() {
        var defer = $q.defer();
        // var data = {'url' : 'admindash/currentcon'};
        // $http.get('http://l-lin.github.io/angular-datatables/archives/data.json')

        $http({
            method: 'GET',
            url: 'http://localhost/SSS_web_api/getMusicBoxData.php',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // data: data,
        })
            .then(function (result) {
                // console.log(result.data);
                var datain = angular.fromJson(result.data.musicboxs);
                defer.resolve(datain);
                // defer.resolve(result.data);
            });
        return defer.promise;
    }
    // $scope.reloadData2 = function(){
    //     var resetPaging = true;
    //     vm.dtInstance.reloadData2(callback, resetPaging);
    //     console.log("aaa")
    // }
    function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
        console.log("aaa")
    }

    function callback(json) {
        console.log(json);
    }
    function someClickHandler(info) {
        //vm.message = info.music_box_id + ' - ' + info.name;
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
        $scope.myFile = undefined;
        $scope.myFile2 = undefined;
        $scope.filename = "Choose picture";
        $scope.filename2 = "Choose music";
        $scope.selectedMusicBox = info;
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/music_pic"
        +$scope.selectedMusicBox.music_box_id+".jpg"
    }
    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function () {
                vm.someClickHandler(aData);
            });
        });
        return nRow;
    }

    //upload

    $scope.$watch('myFile', function (newFileObj) {
        if (newFileObj)
            $scope.filename = newFileObj.name;
        console.log($scope.filename);
    });
    $scope.$watch('myFile2', function (newFileObj) {
        if (newFileObj)
            $scope.filename2 = newFileObj.name;
        console.log($scope.filename2);
    });
    $scope.uploadFile = function () {
        file = $scope.myFile;
        var newfilename ="music_pic"+$scope.selectedMusicBox.music_box_id+".jpg";
        var newfilename2 ="music_sound"+$scope.selectedMusicBox.music_box_id+".mp3";
        file2 = $scope.myFile2;
        var uploadUrl = "http://localhost/SSS_web_api/server_MS_pic.php", //Url of web service
            promise = fileUploadService.uploadFileToUrl(file,newfilename, uploadUrl);
        var uploadUrl2 = "http://localhost/SSS_web_api/server_MS_sound.php", //Url of web service
            promise2 = fileUploadService.uploadFileToUrl(file2,newfilename2, uploadUrl2);

        promise.then(function (response) {
            $scope.serverResponse = response;
        }, function () {
            $scope.serverResponse = 'An error has occurred';
        })
        promise2.then(function (response) {
            $scope.serverResponse = response;
        }, function () {
            $scope.serverResponse = 'An error has occurred';
        })
        $scope.myFile = undefined;
        $scope.myFile2 = undefined;
    };

}



// function AddMusicCtrl(MusicBoxDataServiceSvc) {
    // var self = this;
    // self.editMode = false;
    // self.addMode = false;

    // this.loadData = function () {
    //     MusicBoxDataServiceSvc.getMusicbox()
    //         .then(function (data) {
    //             self.musicboxs = null;
    //             self.musicboxs = data;
    //             self.selectedMusicBox = self.musicboxs[0];


    //         });
    // }
    // self.loadData();

    // this.saveMusic = function () {
    //     self.successMessage = undefined;
    //     self.errorMessage = undefined;
    //     self.addMessage = undefined;
    //     this.editMode = !this.editMode;
    //     var musicboxData = this.selectedMusicBox;
    //     if (self.addMode) {
    //         MusicBoxDataServiceSvc.createMusic(musicboxData)
    //             .then(function () {
    //                 self.loadData();
    //                 self.addMessage = "Succesfully added";

    //             },
    //             function () {
    //                 self.errorMessage = "Error,Please try again";
    //             }
    //             );
    //         self.addMode = false;
    //     }
    //     else {
    //         MusicBoxDataServiceSvc.saveMusic(musicboxData)
    //             .then(function () {
    //                 self.successMessage = "Succesfully updated";
    //             },
    //             function () {
    //                 self.errorMessage = "Error,Please try again";
    //             }
    //             );

    //     }

    // }


    // this.selectMusicBox = function (index) {
    //     this.selectedMusicBox = this.musicboxs[index];
    //     this.lastSelected = this.musicboxs[index];
    //     self.successMessage = undefined;
    //     self.errorMessage = undefined;
    //     self.addMessage = undefined;
    // }

    // this.toggleEditMode = function () {
    //     this.editMode = !this.editMode;
    //     this.addMode = false;
    // }

    // this.addMusicbox = function () {
    //     this.addMode = true;
    //     this.selectedMusicBox = {
    //         "id": new Date().toTimeString()
    //     };
    //     this.editMode = true;
    //     self.successMessage = undefined;
    //     self.errorMessage = undefined;
    //     self.addMessage = undefined;


    // }
    // this.deleteMusicBox = function () {
    //     console.log("delete");
    //     var musicboxData = this.selectedMusicBox;
    //     MusicBoxDataServiceSvc.deleteMusic(musicboxData)
    //         .then(function () {
    //             self.loadData();
    //             self.successMessage = "Deleted";

    //         },
    //         function () {
    //             self.errorMessage = "Error,Please try again";
    //         }
    //         );

    // }
//     this.cancel = function () {
//         self.toggleEditMode();
//         self.selectedMusicBox = self.musicboxs[0];


//     }

// }


