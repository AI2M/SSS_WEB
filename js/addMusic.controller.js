
var app = angular.module("SSS", ['datatables']);

app.controller('AddMusicCtrl', AddMusicCtrl);
function AddMusicCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope) {
    $scope.editMode = false;
    $scope.addMode = false;
    

    $scope.loadData = function () {
        $http.get("http://localhost/SSS_web_api/getMusicBoxData.php")
            .then(function successCallback(response) {
                console.log(response);
                $scope.musicboxs = response.data.musicboxs;
                $scope.selectedMusicBox = $scope.musicboxs[0];
            }, function errorCallback(response) {
                console.log(response);
            });
    }
    $scope.loadData();

    $scope.selectMusicBox = function (index) {
        $scope.selectedMusicBox = $scope.musicboxs[index];
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
            $http({
                method: 'POST',
                url: 'http://localhost/SSS_web_api/postMusicBoxData.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: musicboxData,
            })
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.loadData();
                    if (response.data.error == true) {
                        $scope.errorMessage = "Error,Please try again";
                    }
                    else {
                        $scope.addMessage = "Succesfully added";
                    }

                }, function errorCallback(response) {
                    console.log(response);
                    $scope.errorMessage = "Error,Please try again";
                });
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
                    $scope.loadData();
                    if (response.data.error == true) {
                        $scope.errorMessage = "Error,Please try again";
                    }
                    else {
                        $scope.addMessage = "Succesfully updated";
                    }

                }, function errorCallback(response) {
                    console.log(response);
                    $scope.errorMessage = "Error,Please try again";
                });
            $scope.addMode = false;
        }
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
            "id": new Date().toTimeString()
        };
        $scope.editMode = true;
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
    }

    $scope.cancel = function () {
        $scope.toggleEditMode();
        $scope.selectedMusicBox = $scope.musicboxs[0];
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
        vm.message = info.music_box_id + ' - ' + info.name;
        $scope.selectedMusicBox = info;
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


