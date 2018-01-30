
var app = angular.module("AddMusicApp", []);
app.controller("AddMusicCtrl", ['$scope', '$http', function ($scope, $http) {

    $scope.editMode = false;
    $scope.addMode = false;

    $scope.loadData = function () {
        $http.get("http://localhost:3000/musicboxs")
            .then(function successCallback(response) {
                console.log(response);
                $scope.musicboxs = response.data;
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
            $http.post("http://localhost:3000/musicboxs/", musicboxData)
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.loadData();
                    $scope.addMessage = "Succesfully added";
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.errorMessage = "Error,Please try again";
                });
            $scope.addMode = false;
        }
        else {
            //savemode
            $http.put("http://localhost:3000/musicboxs/" + musicboxData.id, musicboxData)
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.successMessage = "Succesfully updated";
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.errorMessage = "Error,Please try again";
                });
        }
    }

    $scope.deleteMusic = function () {
        var musicboxData = $scope.selectedMusicBox;
        $http.delete("http://localhost:3000/musicboxs/" + musicboxData.id, musicboxData)
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


}]);



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




// app.value("AppnameSvc","Add showroom");

// function prepareAppConfig(AppnameSvc){
//     var value = {};
//     value.name = AppnameSvc;
//     value.author = "apotoxin";
//     value.builtDate = new Date().toDateString();

//     return value;
// }





// app.constant("AppDataSvc", prepareAppConfig);

// app.value("LoggingSvc", function () {
//     console.log("hello");
// });

//app.factory("AppDataFactorySvc", prepareAppConfig );




