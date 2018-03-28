var App = angular.module('SSS', ['ngRoute', 'datatables', 'ngMap', 'chart.js', 'ui.bootstrap']);

// App.config(function ($stateProvider, $urlRouterProvider) {

//   $urlRouterProvider.otherwise('/home');

//   $stateProvider

//     // HOME STATES AND NESTED VIEWS ========================================

//     // nested list with custom controller
//     .state('home', {
//       url: '/home',
//       template: 'homepage',
//     })
//     .state('musics', {
//       url: '/musics',
//       templateUrl: 'addMusic.html',
//       controller: 'AddMusicCtrl as showCase'
//     })

//     .state('showrooms', {
//       url: '/showrooms',
//       templateUrl: 'addShowroom.html',
//       controller: 'AddShowroomCtrl as vm'
//     })
//     .state('engagements', {
//       url: '/engagements',
//       templateUrl: 'showTransactions.html',
//       controller: 'ShowTranCtrl as vm'
//     })
//     .state('customers', {
//       url: '/customers',
//       templateUrl: 'showCustomers.html',
//       controller: 'ShowCusCtrl as showCase'
//     })



// });

App.config(function ($routeProvider) {
    $routeProvider
        .when('/musics', {
            resolve: {
                check: function ($location, $rootScope) {
                    if (!$rootScope.super_loggedIn) {
                        $location.path('/');
                        console.log('nologgin');
                    }
                }
            },
            templateUrl: 'addMusic.html',
            controller: 'AddMusicCtrl as showCase'
        })
        .when('/showrooms', {
            resolve: {
                check: function ($location, $rootScope) {
                    if (!$rootScope.super_loggedIn) {
                        $location.path('/');
                        console.log('nologgin');
                    }
                }
            },
            templateUrl: 'addShowroom.html',
            controller: 'AddShowroomCtrl as vm'
        })
        .when('/engagements', {
            resolve: {
                check: function ($location, $rootScope) {
                    if (!$rootScope.super_loggedIn) {
                        $location.path('/');
                        console.log('nologgin');
                    }
                }
            },
            templateUrl: 'showTransactions.html',
            controller: 'ShowTranCtrl as vm'
        })
        .when('/customers', {
            resolve: {
                check: function ($location, $rootScope) {
                    if (!$rootScope.super_loggedIn) {
                        $location.path('/');
                        console.log('nologgin');
                    }
                }
            },
            templateUrl: 'showCustomers.html',
            controller: 'ShowCusCtrl as showCase'
        })
        .when('/manage', {
            resolve: {
                check: function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                        console.log('nologgin');
                    }
                }
            },
            templateUrl: 'ManageShowroom.html',
            controller: 'MshowCtrl as vm'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'NavCtrl'
        })

        .otherwise({
            redirectTo: '/login'
        });
});

App.controller('NavCtrl', NavCtrl);
function NavCtrl($scope, $location, $rootScope, $http) {
    var userData = {};
    $scope.getUsername = "";
    $scope.getPassword = "";
    $scope.manageStatus=false;

    $scope.showrooms = function () {
        $location.path('/showrooms');
    }
    $scope.engagements = function () {
        $location.path('/engagements');
    }
    $scope.customers = function () {
        $location.path('/customers');
    }
    $scope.musics = function () {
        $location.path('/musics');
    }
    $scope.manage = function () {
        $location.path('/manage');
    }


    $scope.login = function () {
        $scope.getData();
       
    }
    $rootScope.logout = function () {
        $rootScope.super_loggedIn = false;
        $rootScope.loggedIn = false;
        $location.path('/login');
    }
    $scope.getData = function () {
        userData["username"] = $scope.username;
        userData["password"] = $scope.password;
        console.log(userData);
            $http({
                method: 'POST',
                url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/WebLogin.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: userData,
            })
                .then(function successCallback(response) {
                    console.log(response);
                    if (response.data.error == false) {
                        console.log("getData success");
                        $scope.getUsername = response.data.user[0].username;
                        $scope.getPassword = response.data.user[0].password;
                        if ($scope.username ==  $scope.getUsername && $scope.password == $scope.getPassword) {
                            $rootScope.super_loggedIn = true;
                            $rootScope.user = $scope.getUsername;
                            console.log($rootScope.super_loggedIn);
                            $location.path('/engagements');
                        }
                        else {
                            //alert('Wrong stuff');
                            
                        }
    
                    }
                    else {
                        $scope.manageStatus = true;
                        console.log("getData error SSS");
                    }
    
                }, function errorCallback(response) {
                    console.log(response);
    
                });
        
        
                $http({
                    method: 'POST',
                    url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/WebManageLogin.php',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: userData,
                })
                    .then(function successCallback(response) {
                        console.log(response);
                        if (response.data.error == false) {
                            console.log("getData success");
                            $scope.getUsername = response.data.showroom[0].showroom_id;
                            $scope.getPassword = response.data.showroom[0].password;
                            if ($scope.username ==  $scope.getUsername && $scope.password == $scope.getPassword) {
                                $rootScope.loggedIn = true;
                                $rootScope.user = $scope.getUsername;
                                console.log($rootScope.loggedIn);
                                $location.path('/manage');
                            }
                            else {
                                alert('Wrong stuff');
                            }
        
                        }
                        else {
                            console.log("getData error manage");
                        }
        
                    }, function errorCallback(response) {
                        console.log(response);
        
                    });
            

    }

}

App.controller('AddMusicCtrl', AddMusicCtrl);
function AddMusicCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope, fileUploadService) {
    $scope.editMode = false;
    $scope.addMode = false;
    $scope.image_url = "";
    var file;
    var file2;
    $scope.filename = "Choose picture";
    $scope.filename2 = "Choose music";

    $scope.loadData = function () {
        $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getMusicBoxData.php")
            .then(function successCallback(response) {
                console.log(response);
                $scope.musicboxs = response.data.musicboxs;
                $scope.selectedMusicBox = $scope.musicboxs[0];
                $scope.image_url = undefined;
                $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/music_pic"
                    + $scope.selectedMusicBox.music_box_id + ".jpg"
            }, function errorCallback(response) {
                console.log(response);
            });
    }
    $scope.loadData();

    $scope.selectMusicBox = function (index) {
        $scope.selectedMusicBox = $scope.musicboxs[index];
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/music_pic"
            + $scope.selectedMusicBox.music_box_id + ".jpg"
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
        console.log(musicboxData);
        if ($scope.addMode) {
            //addmode

            if ($scope.myFile != undefined && $scope.myFile2 != undefined) {
                $http({
                    method: 'POST',
                    url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/postMusicBoxData.php',
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
            else {
                $scope.errorMessage = "Error,Please choose picture and music";
                $scope.selectedMusicBox = $scope.musicboxs[0];
                $scope.image_url = "/Applications/XAMPP/xamppfiles/images/music_boxes/music_pic"
                    + $scope.selectedMusicBox.music_box_id + ".jpg"
            }

            $scope.addMode = false;
        }
        else {
            //savemode
            $http({
                method: 'POST',
                url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/putMusicBoxData.php',
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
        $http.delete("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/deleteMusicBoxData.php/?music_box_id=" + musicboxData.music_box_id)
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
            + $scope.selectedMusicBox.music_box_id + ".jpg"
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
            url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getMusicBoxData.php',
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
            url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getMusicBoxData.php',
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
            + $scope.selectedMusicBox.music_box_id + ".jpg"
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
        var newfilename = "music_pic" + $scope.selectedMusicBox.music_box_id + ".jpg";
        var newfilename2 = "music_sound" + $scope.selectedMusicBox.music_box_id + ".mp3";
        file2 = $scope.myFile2;
        var uploadUrl = "http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/server_MS_pic.php", //Url of web service
            promise = fileUploadService.uploadFileToUrl(file, newfilename, uploadUrl);
        var uploadUrl2 = "http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/server_MS_sound.php", //Url of web service
            promise2 = fileUploadService.uploadFileToUrl(file2, newfilename2, uploadUrl2);

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

App.controller('AddShowroomCtrl', AddShowroomCtrl);
function AddShowroomCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope, NgMap, fileUploadService) {

    $scope.editMode = false;
    $scope.addMode = false;
    $scope.lalong = [];
    var file;
    var file2;
    $scope.filename = "Choose picture";
    $scope.image_url = "";

    $scope.loadData = function () {
        $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getShowroomData.php")
            .then(function successCallback(response) {
                console.log(response);
                $scope.showrooms = response.data.showrooms;
                $scope.selectedShowroom = $scope.showrooms[0];
                $scope.image_url = "/Applications/XAMPP/xamppfiles/images/showrooms/showroom_pic"
                    + $scope.selectedShowroom.showroom_id + ".jpg"
                var la = $scope.selectedShowroom.latitude;
                var long = $scope.selectedShowroom.longitude;
                $scope.lalong = [la, long];
                vm.positions = [];
                vm.positions[0] = { pos: $scope.lalong };
                console.log("lalong = " + $scope.lalong);
                console.log($scope.showrooms[0].longitude)
            }, function errorCallback(response) {
                console.log(response);
            });
    }
    $scope.loadData();

    $scope.selectShowroom = function (index) {
        $scope.selectedShowroom = $scope.showrooms[index];
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/showrooms/showroom_pic"
            + $scope.selectedShowroom.showroom_id + ".jpg"
        var la = $scope.selectedShowroom.latitude;
        var long = $scope.selectedShowroom.longitude;
        $scope.lalong = [la, long];
        vm.positions = [];
        vm.positions[0] = { pos: $scope.lalong };
        console.log("lalong = " + $scope.lalong);
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
    }

    $scope.saveShowroom = function () {
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
        $scope.editMode = !$scope.editMode;
        var showroomData = $scope.selectedShowroom;
        if ($scope.addMode) {

            if ($scope.myFile != undefined) {
                $http({
                    method: 'POST',
                    url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/postShowroomData.php',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    data: showroomData,
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
            else {
                $scope.errorMessage = "Error,Please choose picture";
                $scope.selectedShowroom = $scope.showrooms[0];
                $scope.image_url = "/Applications/XAMPP/xamppfiles/images/showrooms/showroom_pic"
                    + $scope.selectedShowroom.showroom_id + ".jpg"
            }

            $scope.addMode = false;
            //  console.log(showroomData);
            //addmode
            // $http.post("http://localhost:3000/showrooms/", showroomData)
            //     .then(function successCallback(response) {
            //         console.log(response);
            //         $scope.loadData();
            //         $scope.addMessage = "Succesfully added";
            //     }, function errorCallback(response) {
            //         console.log(response);
            //         $scope.errorMessage = "Error,Please try again";
            //     });
            // $scope.addMode = false;
        }
        else {
            //savemode
            $http({
                method: 'POST',
                url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/putShowroomData.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                data: showroomData,
            })
                .then(function successCallback(response) {
                    //console.log( "showroomData = "+$scope.selectedShowroom);
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
        }
        $scope.filename = "Choose picture";

    }

    $scope.deleteShowroom = function () {
        var showroomData = $scope.selectedShowroom;
        $http.delete("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/deleteShowroomData.php/?showroom_id=" + showroomData.showroom_id)
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


    $scope.addShowroom = function () {
        $scope.addMode = true;

        $scope.selectedShowroom = {
            // "showroom_id": new Date().toTimeString()
        };
        $scope.editMode = true;
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/showrooms/noimage.jpg";
    }

    $scope.cancel = function () {
        $scope.myFile = undefined;
        $scope.filename = "Choose picture";
        $scope.toggleEditMode();
        $scope.selectedShowroom = $scope.showrooms[0];
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/showrooms/showroom_pic"
            + $scope.selectedShowroom.showroom_id + ".jpg"


    }
    //map
    var vm = this;
    vm.types = "['address']";


    vm.placeChanged = function () {
        vm.place = this.getPlace();
        console.log('location', vm.place.geometry.location);
        vm.map.setCenter(vm.place.geometry.location);
    }

    vm.addMarker = function (event) {

        if ($scope.editMode == true) {
            vm.positions = [];
            var ll = event.latLng;
            vm.positions[0] = { pos: [ll.lat(), ll.lng()] };
            console.log("laaaaa======" + ll.lat());
            console.log("longgg======" + ll.lng());
            $scope.selectedShowroom.latitude = ll.lat();
            $scope.selectedShowroom.longitude = ll.lng();
        }

    }

    NgMap.getMap().then(function (map) {
        vm.map = map;
        vm.positions = [];
        vm.positions[0] = { pos: $scope.lalong };
    });

    //datatable
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
            url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getShowroomData.php',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // data: data,
        })
            .then(function (result) {
                // console.log(result.data);
                var datain = angular.fromJson(result.data.showrooms);
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
        DTColumnBuilder.newColumn('showroom_id').withTitle('Showroom ID'),
        DTColumnBuilder.newColumn('location').withTitle('Name'),
        DTColumnBuilder.newColumn('region').notSortable().withTitle('Region'),
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
            url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getShowroomData.php',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // data: data,
        })
            .then(function (result) {
                // console.log(result.data);
                var datain = angular.fromJson(result.data.showrooms);
                defer.resolve(datain);
                // defer.resolve(result.data);
            });
        return defer.promise;
    }
    function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
        console.log("bbb")
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
        $scope.filename = "Choose picture";
        $scope.selectedShowroom = info;
        $scope.image_url = "/Applications/XAMPP/xamppfiles/images/showrooms/showroom_pic"
            + $scope.selectedShowroom.showroom_id + ".jpg"
        var la = $scope.selectedShowroom.latitude;
        var long = $scope.selectedShowroom.longitude;
        $scope.lalong = [la, long];
        vm.positions = [];
        vm.positions[0] = { pos: $scope.lalong };
        console.log("lalong = " + $scope.lalong);

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

    $scope.uploadFile = function () {
        file = $scope.myFile;
        console.log($scope.selectedShowroom.showroom_id)
        var newfilename = "showroom_pic" + $scope.selectedShowroom.showroom_id + ".jpg";
        var uploadUrl = "http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/server_SH_pic.php", //Url of web service
            promise = fileUploadService.uploadFileToUrl(file, newfilename, uploadUrl);

        promise.then(function (response) {
            $scope.serverResponse = response;
        }, function () {
            $scope.serverResponse = 'An error has occurred';
        })
        $scope.myFile = undefined;
    };

}

App.controller('ShowTranCtrl', ShowTranCtrl);
function ShowTranCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope, NgMap) {
    var vm = this;
    vm.dtInstance = {};
    // vm.newPromise = newPromise;
    vm.reloadData = reloadData;
    // vm.newPromise = newPromise;

    var api_url = 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=all';
    $scope.transactions = "";
    $scope.transactionMaps = "";
    $scope.musicboxs = "";
    $scope.showrooms = "";
    $scope.tab_month = false;
    $scope.tab_7day = false;
    var now = new Date();
    $scope.nowdate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

    $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionMapData.php")
        .then(function successCallback(response) {
            $scope.transactionMaps = response.data.transactionMaps;
            $scope.AddPos();
            // console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getShowroomData.php")
        .then(function successCallback(response) {
            $scope.showrooms = response.data.showrooms;
            // console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getMusicBoxData.php")
        .then(function successCallback(response) {
            $scope.musicboxs = response.data.musicboxs;
            // console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });

    $scope.loadData = function (type) {
        if (type == 1) {
            //last7day
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=last7")
                .then(function successCallback(response) {
                    // api_url='http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=last7';
                    // $scope.loadTable();
                    if (response.data.error == true) {
                        console.log("error get 7 day data");
                        $scope.tab_7day = true;
                    }
                    else {
                        console.log(response);
                        $scope.transactions = response.data.transactions;
                        $scope.LineChart(0);
                        $scope.ShowroomChart();
                    }

                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else if (type == 2) {
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=thismonth")
                .then(function successCallback(response) {
                    // api_url='http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=thismonth';
                    // $scope.loadTable();
                    if (response.data.error == true) {
                        console.log("error get month data");
                        $scope.tab_month = true;
                    }
                    else {
                        console.log(response);
                        $scope.transactions = response.data.transactions;
                        $scope.LineChart(1);
                        $scope.ShowroomChart();
                    }

                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else if (type == 3) {
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=thisyear")
                .then(function successCallback(response) {
                    // api_url='http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=thisyear';

                    console.log(response);
                    $scope.transactions = response.data.transactions;
                    $scope.LineChart(2);
                    $scope.ShowroomChart();
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else {
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=all")
                .then(function successCallback(response) {
                    // api_url='http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getTransactionData.php/?type=all';

                    console.log(response);
                    $scope.transactions = response.data.transactions;
                    $scope.LineChart(3);
                }, function errorCallback(response) {
                    console.log(response);
                });

        }

    }

    //bubble sort 
    $scope.sorting = function (arr, arr2) {
        for (var i = 0; i < arr.length; i++) {
            // Last i elements are already in place   
            for (var j = 0; j < (arr.length); j++) {
                if (arr[j] < arr[j + 1]) {
                    var temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;

                    var temp2 = arr2[j + 1];
                    arr2[j + 1] = arr2[j];
                    arr2[j] = temp2;
                }

            }
        }
        console.log($scope.num);

    }



    //chart of musicbox
    $scope.MusicBoxChart = function () {
        $scope.nameBarChart = "Drilldown By Music Box";
        $scope.ids_data = [];
        $scope.num = [];
        $scope.numuse = [];
        var data = $scope.transactions;

        for (var i = 0; i < $scope.transactions.length; i++) {
            if ($scope.ids_data.indexOf(data[i].music_box_id) == -1) {
                $scope.ids_data.push(data[i].music_box_id);
            }
        }
        for (var p = 0; p < $scope.ids_data.length; p++) {
            $scope.num[p] = 0;
        }

        for (var j = 0; j < $scope.transactions.length; j++) {
            for (var k = 0; k < $scope.ids_data.length; k++) {
                if (data[j].music_box_id == $scope.ids_data[k]) {
                    $scope.num[k] += 1;
                }
            }

        }
        //console.log($scope.ids_data);
        // console.log($scope.num);
        $scope.sorting($scope.num, $scope.ids_data);
        for (var p = 0; p < 10; p++) {
            $scope.numuse[p] = $scope.num[p];
        }
        if ($scope.ids_data.length > 10) {
            for (var p = 0; p < 10; p++) {
                $scope.ids_datause[p] = $scope.ids_data[p];
            }
            $scope.ids_data = $scope.ids_datause;
        }
        console.log($scope.numuse);
        $scope.m_name = [];
        for (var i = 0; i < $scope.ids_data.length; i++) {
            for (var k = 0; k < $scope.musicboxs.length; k++) {
                if ($scope.ids_data[i] == $scope.musicboxs[k].music_box_id) {
                    $scope.m_name[i] = $scope.musicboxs[k].name;
                }
            }
        }
        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "id: " + $scope.ids_data[l] + "-" + $scope.m_name[l];
        }

        $scope.options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Engagements (Click)'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        //labelString: 'Music Box ID'
                    }
                }]
            }
        };


    }

    //chart of showroom
    $scope.ShowroomChart = function () {
        $scope.nameBarChart = "Drilldown By Showroom";
        $scope.ids_data = [];
        $scope.ids_datause = [];
        $scope.num = [];
        $scope.numuse = [];
        var data = $scope.transactions;
        for (var i = 0; i < $scope.transactions.length; i++) {
            if ($scope.ids_data.indexOf(data[i].showroom_id) == -1) {
                $scope.ids_data.push(data[i].showroom_id);
            }
        }
        for (var p = 0; p < $scope.ids_data.length; p++) {
            $scope.num[p] = 0;
        }

        for (var j = 0; j < $scope.transactions.length; j++) {
            for (var k = 0; k < $scope.ids_data.length; k++) {
                if (data[j].showroom_id == $scope.ids_data[k]) {
                    $scope.num[k] += 1;
                }
            }

        }
        // console.log($scope.num);
        $scope.sorting($scope.num, $scope.ids_data);
        for (var p = 0; p < 10; p++) {
            $scope.numuse[p] = $scope.num[p];
        }
        if ($scope.ids_data.length > 10) {
            for (var p = 0; p < 10; p++) {
                $scope.ids_datause[p] = $scope.ids_data[p];
            }
            $scope.ids_data = $scope.ids_datause;
        }
        console.log($scope.numuse);

        $scope.s_locations = [];
        for (var i = 0; i < $scope.ids_data.length; i++) {
            for (var k = 0; k < $scope.showrooms.length; k++) {
                if ($scope.ids_data[i] == $scope.showrooms[k].showroom_id) {
                    $scope.s_locations[i] = $scope.showrooms[k].location;
                }
            }
        }

        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "id: " + $scope.ids_data[l] + "-" + $scope.s_locations[l];
        }


        $scope.options2 = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Engagements (Click)'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        //labelString: 'Showroom ID'
                    }
                }]
            }
        };


    }

    //dropdown
    $scope.DropdownItems = ["Showroom", "Music Box"];
    $scope.Change = function (DropdownItems) {
        if (DropdownItems == "Showroom") {
            //console.log("click Showroom");
            $scope.ShowroomChart();

        }
        else {
            //console.log("click Music Box");
            $scope.MusicBoxChart();

        }

    }
    $scope.loadData(1);
    $scope.loadData(2);
    $scope.loadData(3);
    //bar chart

    $scope.LineChart = function (type) {
        var dates = new Date();
        var date = dates.getDate();
        var month = dates.getMonth() + 1;
        var data = $scope.transactions.data;
        //console.log(dates);
        $scope.series = ['Transaction'];
        if (type == 0) {
            // last 7 day21
            $scope.x_axis = [];
            $scope.y_axis = [[]];
            var i, t;
            for (i = date; i > date - 7; i--) {
                if (i <= 0) {
                    if (month == 1 || month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11) {
                        j = i + 31;
                    }
                    else if (month == 5 || month == 7 || month == 10 || month == 12) {
                        j = i + 30;
                    }
                    else if (month == 3) {
                        j = i + 28;

                    }
                    $scope.x_axis.push(j);
                }
                else {
                    $scope.x_axis.push(i);
                }

            }
            for (var z = 0; z < 7; z++) {
                $scope.y_axis[0].push(0);
            }

            for (var p = 0; p < $scope.transactions.length; p++) {
                var date = new Date($scope.transactions[p].datetime).getDate();
                //console.log(date);
                for (var y = 0; y < $scope.x_axis.length; y++) {
                    if (date == $scope.x_axis[y]) {
                        $scope.y_axis[[0]][y] += 1;
                    }
                }

            }
            $scope.date7 = $scope.x_axis[6] + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
            $scope.date1 = $scope.x_axis[0] + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
            $scope.nameLineChart = "Last 7 Day Engagements , Between " + $scope.date1 + " - " + $scope.date7;
            // console.log($scope.x_axis);
            // console.log($scope.y_axis);
            $scope.options = {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Engagements (Click)'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }]
                }
            };
        }
        else if (type == 1) {
            $scope.thismonth = now.getMonth();
            $scope.namemonth = ["January", "February", "March", "April", "May", "June", "July", "August"
                , "September", "October", "November", "December"]
            $scope.nameLineChart = "This Month Engagements , Now " + $scope.namemonth[$scope.thismonth];

            //this month
            $scope.x_axis = [];
            $scope.y_axis = [[]];
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                for (var i = 1; i <= 31; i++) {
                    $scope.x_axis.push(i);
                }
            }
            else if (month == 4 || month == 6 || month == 9 || month == 11) {
                for (var i = 1; i <= 30; i++) {
                    $scope.x_axis.push(i);
                }
            }
            else if (month == 2) {
                for (var i = 1; i <= 28; i++) {
                    $scope.x_axis.push(i);
                }

            }

            for (var z = 0; z < $scope.x_axis.length; z++) {
                $scope.y_axis[0].push(0);
            }
            for (var p = 0; p < $scope.transactions.length; p++) {
                var date = new Date($scope.transactions[p].datetime).getDate();
                // console.log(data);
                for (var y = 0; y < $scope.x_axis.length; y++) {
                    if (date == $scope.x_axis[y]) {
                        $scope.y_axis[[0]][y] += 1;
                    }
                }

            }
            // for(var r =0;r<$scope.x_axis.length;r++){
            //     $scope.x_axis[r]=  "date "+$scope.x_axis[r];
            // }

            // console.log($scope.x_axis);
            // console.log($scope.y_axis);
            $scope.options = {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Engagements (Click)'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }]
                }
            };

        }
        else {
            $scope.thisyear = now.getFullYear();
            $scope.nameLineChart = "This Year Engagements , Now " + $scope.thisyear;
            //this year
            $scope.x_axis = [];
            $scope.y_axis = [[]];

            $scope.month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $scope.x_axis = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];

            for (var z = 0; z < $scope.x_axis.length; z++) {
                $scope.y_axis[0].push(0);
            }
            for (var p = 0; p < $scope.transactions.length; p++) {
                var month = new Date($scope.transactions[p].datetime).getMonth() + 1;
                for (var y = 0; y < $scope.x_axis.length; y++) {
                    if (month == $scope.x_axis[y]) {
                        $scope.y_axis[[0]][y] += 1;
                    }
                }

            }

            for (var r = 0; r < $scope.x_axis.length; r++) {
                $scope.x_axis[r] = $scope.x_axis[r] + " " + $scope.month_name[r];
            }
            // console.log($scope.x_axis);
            // console.log($scope.y_axis);
            // console.log($scope.y_axis[[0]][1]);
            $scope.options = {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Engagements (Click)'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Months'
                        }
                    }]
                }
            };
        }
    }
    //datatable

    $scope.loadTable = function () {
        vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var datain = "";
            var defer = $q.defer();
            // var data = {'url' : 'http://139.59.251.210/api-prevent/ajax/getallrounds'};
            // $http.get('http://l-lin.github.io/angular-datatables/archives/data.json')

            $http({
                method: 'GET',
                url: api_url,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // data: data,
            })
                .then(function (result) {
                    // console.log(result.data);
                    var datain = angular.fromJson(result.data.transactions);
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
            .withOption('order', [[0, 'desc']]);
        vm.dtColumns = [
            DTColumnBuilder.newColumn('datetime').withTitle('Datetime'),
            DTColumnBuilder.newColumn('showroom_id').withTitle('Showroom ID'),
            DTColumnBuilder.newColumn('location').notSortable().withTitle('Showroom Name')


        ];

    }
    $scope.loadTable();

    function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
    }

    function callback(json) {
        console.log(json);
    }
    //map
    vm.positions = [];
    // vm.pos = [[18.574725983616,99.008361756933]]; 
    vm.value = [];
    vm.pic = [];
    $scope.AddPos = function () {
        for (var k = 0; k < $scope.transactionMaps.length; k++) {
            vm.positions.push([$scope.transactionMaps[k].latitude, $scope.transactionMaps[k].longitude]);
            if ($scope.transactionMaps[k].count < 2) {
                vm.pic.push("js/map/icon/m1.png");
            }
            else if ($scope.transactionMaps[k].count < 4) {
                vm.pic.push("js/map/icon/m2.png");
            }
            else if ($scope.transactionMaps[k].count < 6) {
                vm.pic.push("js/map/icon/m3.png");
            }
            else if ($scope.transactionMaps[k].count < 8) {
                vm.pic.push("js/map/icon/m4.png");
            }
            else {
                vm.pic.push("js/map/icon/m5.png");
            }
            vm.value.push($scope.transactionMaps[k].location + " : " + $scope.transactionMaps[k].count);
        }
        console.log("posss = " + vm.positions[0]);
        console.log("posss = " + vm.value);
    }

    // NgMap.getMap().then(function(map) {
    //     vm.showCustomMarker= function(evt) {
    //       map.customMarkers.foo.setVisible(true);
    //       map.customMarkers.foo.setPosition(this.getPosition());
    //     };
    //     vm.closeCustomMarker= function(evt) {
    //       this.style.display = 'none';
    //     };
    //   });


    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40]
    ];
}

App.controller('ShowCusCtrl', ShowCusCtrl);
function ShowCusCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope, $location, $window) {

    $scope.customers = "";
    $scope.customersall = "";
    $scope.Col2 = "Count";
    $scope.nameDoughnutChart = "";
    $scope.ids_data = [];
    $scope.num = [];

    $scope.loadData = function (type) {
        $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getCustomerData.php/?type=all")
            .then(function successCallback(response) {
                console.log(response);
                $scope.customersall = response.data.customers;

            }, function errorCallback(response) {
                console.log(response);
            });
        if (type == 1) {
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getCustomerData.php/?type=age")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.customers = response.data.customers;
                    $scope.AgeChart();
                    $scope.datapie(1);

                }, function errorCallback(response) {
                    console.log(response);
                });
            $scope.tabletype = 1;
            $scope.Col1 = "Age";
        }
        else if (type == 2) {
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getCustomerData.php/?type=sex")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.customers = response.data.customers;
                    $scope.SexChart();
                    $scope.datapie(2);

                }, function errorCallback(response) {
                    console.log(response);
                });
            $scope.tabletype = 2;
            $scope.Col1 = "Sex";
        }
        else if (type == 3) {
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getCustomerData.php/?type=job")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.customers = response.data.customers;
                    $scope.JobChart();
                    $scope.datapie(3);

                }, function errorCallback(response) {
                    console.log(response);
                });
            $scope.tabletype = 3;
            $scope.Col1 = "Job";
        }
        else if (type == 4) {
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getCustomerData.php/?type=salary")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.customers = response.data.customers;
                    $scope.SalaryChart();
                    $scope.datapie(4);

                }, function errorCallback(response) {
                    console.log(response);
                });
            $scope.tabletype = 4;
            $scope.Col1 = "Salary";
        }
        else if (type == 5) {
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getCustomerData.php/?type=showroom_id")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.customers = response.data.customers;
                    $scope.ShowroomChart();
                    $scope.datapie(5);

                }, function errorCallback(response) {
                    console.log(response);
                });
            $scope.tabletype = 5;
            $scope.Col1 = "Showroom";
        }
    }

    $scope.loadData(1);

    //select data 
    $scope.selectedCustomer = $scope.customers[0];
    $scope.selectCustomer = function (index) {
        $scope.selectedCustomer = $scope.customers[index];
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
    }

    $scope.AgeChart = function () {
        $scope.nameDoughnutChart = " Customer AgeChart";
        $scope.ids_data = [];
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < data.length; i++) {
            if ($scope.ids_data.indexOf(data[i].age) == -1) {
                $scope.ids_data.push(data[i].age);
            }
        }
        for (var j = 0; j < data.length; j++) {
            $scope.num.push(data[j].age_count);
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }

    $scope.SexChart = function () {
        $scope.nameDoughnutChart = " Customer SexChart";
        $scope.ids_data = [];
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < data.length; i++) {
            if ($scope.ids_data.indexOf(data[i].sex) == -1) {
                $scope.ids_data.push(data[i].sex);
            }
        }
        for (var j = 0; j < data.length; j++) {
            $scope.num.push(data[j].sex_count);
        }

        console.log($scope.ids_data);
        console.log($scope.num);
    }

    $scope.JobChart = function () {
        $scope.nameDoughnutChart = " Customer JobChart";
        $scope.ids_data = [];
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < data.length; i++) {
            if ($scope.ids_data.indexOf(data[i].job) == -1) {
                $scope.ids_data.push(data[i].job);
            }
        }
        for (var j = 0; j < data.length; j++) {
            $scope.num.push(data[j].job_count);
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }

    $scope.SalaryChart = function () {
        $scope.nameDoughnutChart = " Customer SalaryChart";
        $scope.ids_data = [];
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < data.length; i++) {
            if ($scope.ids_data.indexOf(data[i].salary) == -1) {
                $scope.ids_data.push(data[i].salary);
            }
        }
        for (var j = 0; j < data.length; j++) {
            $scope.num.push(data[j].salary_count);
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }
    $scope.ShowroomChart = function () {
        $scope.nameDoughnutChart = " Customer ShowroomChart";
        $scope.ids_data = [];
        $scope.ids_datause = [];
        $scope.num = [];
        $scope.numuse = [];

        var data = $scope.customers;

        for (var i = 0; i < data.length; i++) {
            if ($scope.ids_data.indexOf(data[i].showroom_id) == -1) {
                $scope.ids_data.push(data[i].showroom_id);
            }
        }
        for (var j = 0; j < data.length; j++) {
            $scope.num.push(data[j].counts);
        }
        console.log($scope.ids_data);
        console.log($scope.num);
        $scope.sorting($scope.num, $scope.ids_data);

        for (var p = 0; p < 10; p++) {
            $scope.numuse[p] = $scope.num[p];
        }
        $scope.num = $scope.numuse;
        if ($scope.ids_data.length > 10) {
            for (var p = 0; p < 10; p++) {
                $scope.ids_datause[p] = $scope.ids_data[p];
            }
            $scope.ids_data = $scope.ids_datause;
        }

        $scope.s_name = [];
        for (var i = 0; i < $scope.ids_data.length; i++) {
            for (var k = 0; k < $scope.customersall.length; k++) {
                if ($scope.ids_data[i] == $scope.customersall[k].showroom_id) {
                    $scope.s_name[i] = $scope.customersall[k].location;
                }
            }
        }
        $scope.ids_data = $scope.s_name;
    }

    //bubble sort 
    $scope.sorting = function (arr, arr2) {
        for (var i = 0; i < arr.length; i++) {
            // Last i elements are already in place   
            for (var j = 0; j < (arr.length); j++) {
                if (arr[j] < arr[j + 1]) {
                    var temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;

                    var temp2 = arr2[j + 1];
                    arr2[j + 1] = arr2[j];
                    arr2[j] = temp2;
                }

            }
        }
        console.log($scope.num);

    }


    //datatable
    var vm = this;
    vm.dtInstance = {};
    vm.reloadData = reloadData;

    $scope.loadTable = function () {
        vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var datain = "";
            var defer = $q.defer();
            // var data = {'url' : 'http://139.59.251.210/api-prevent/ajax/getallrounds'};
            // $http.get('http://l-lin.github.io/angular-datatables/archives/data.json')

            $http({
                method: 'GET',
                url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getCustomerData.php/?type=all',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // data: data,
            })
                .then(function (result) {
                    // console.log(result.data);
                    var datain = angular.fromJson(result.data.customers);
                    // // console.log(datain);
                    defer.resolve(datain);
                    // defer.resolve(result.data);
                });
            return defer.promise;
        })
            // vm.dtOptions = DTOptionsBuilder.fromSource('http://l-lin.github.io/angular-datatables/archives/data.json')
            .withPaginationType('full')
            // Active Responsive plugin
            .withOption('responsive', true);
        vm.dtColumns = [
            DTColumnBuilder.newColumn('salary').withTitle('Salary'),
            DTColumnBuilder.newColumn('phone_num').notSortable().withTitle('Phone Number'),
            DTColumnBuilder.newColumn('facebook').notSortable().withTitle('facebook'),
            DTColumnBuilder.newColumn('sex').notSortable().withTitle('Gender'),
            DTColumnBuilder.newColumn('age').notSortable().withTitle('Age'),
            DTColumnBuilder.newColumn('job').notSortable().withTitle('Job'),
            DTColumnBuilder.newColumn('showroom_id').withTitle('Showroom ID'),
            DTColumnBuilder.newColumn('location').withTitle('Showroom Name'),
        ];
    }
    $scope.loadTable();

    function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
    }

    function callback(json) {
        console.log(json);
    }

    //piechart
    $scope.seriesUse = {};

    $scope.pie = function () {
        Highcharts.chart('pieHi', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: $scope.nameDoughnutChart
            },
            tooltip: {
                pointFormat: '{series.name} : <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> : {point.y} customers',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: $scope.seriesUse
        });
    }

    $scope.datapie = function (type) {
        if (type == 1) {
            //age
            $scope.seriesUse = [{
                name: 'Percentage',
                colorByPoint: true,
                data: [{
                    name: $scope.ids_data[0],
                    y: parseInt($scope.num[0])
                }, {
                    name: $scope.ids_data[1],
                    y: parseInt($scope.num[1]),
                    sliced: true,
                    selected: true
                }, {
                    name: $scope.ids_data[2],
                    y: parseInt($scope.num[2])
                }, {
                    name: $scope.ids_data[3],
                    y: parseInt($scope.num[3])
                }, {
                    name: $scope.ids_data[4],
                    y: parseInt($scope.num[4])
                }]
            }]
        }
        else if (type == 2) {
            //sex
            $scope.seriesUse = [{
                name: 'Percentage',
                colorByPoint: true,
                data: [{
                    name: $scope.ids_data[0],
                    y: parseInt($scope.num[0])
                }, {
                    name: $scope.ids_data[1],
                    y: parseInt($scope.num[1]),
                    sliced: true,
                    selected: true
                }]
            }]
        }
        else if (type == 3) {
            //job
            $scope.seriesUse = [{
                name: 'Percentage',
                colorByPoint: true,
                data: [{
                    name: $scope.ids_data[0],
                    y: parseInt($scope.num[0])
                }, {
                    name: $scope.ids_data[1],
                    y: parseInt($scope.num[1]),
                    sliced: true,
                    selected: true
                }, {
                    name: $scope.ids_data[2],
                    y: parseInt($scope.num[2])
                }, {
                    name: $scope.ids_data[3],
                    y: parseInt($scope.num[3])
                }, {
                    name: $scope.ids_data[4],
                    y: parseInt($scope.num[4])
                }, {
                    name: $scope.ids_data[5],
                    y: parseInt($scope.num[5])
                }, {
                    name: $scope.ids_data[6],
                    y: parseInt($scope.num[6])
                }]
            }]
        }
        else if (type == 4) {
            //salary
            $scope.seriesUse = [{
                name: 'Percentage',
                colorByPoint: true,
                data: [{
                    name: $scope.ids_data[0],
                    y: parseInt($scope.num[0])
                }, {
                    name: $scope.ids_data[1],
                    y: parseInt($scope.num[1]),
                    sliced: true,
                    selected: true
                }, {
                    name: $scope.ids_data[2],
                    y: parseInt($scope.num[2])
                }, {
                    name: $scope.ids_data[3],
                    y: parseInt($scope.num[3])
                }, {
                    name: $scope.ids_data[4],
                    y: parseInt($scope.num[4])
                }, {
                    name: $scope.ids_data[5],
                    y: parseInt($scope.num[5])
                }]
            }]
        }
        else if (type == 5) {
            //showroom
            $scope.seriesUse = [{
                name: 'Percentage',
                colorByPoint: true,
                data: [{
                    name: $scope.ids_data[0],
                    y: parseInt($scope.num[0])
                }, {
                    name: $scope.ids_data[1],
                    y: parseInt($scope.num[1]),
                    sliced: true,
                    selected: true
                }, {
                    name: $scope.ids_data[2],
                    y: parseInt($scope.num[2])
                }, {
                    name: $scope.ids_data[3],
                    y: parseInt($scope.num[3])
                }, {
                    name: $scope.ids_data[4],
                    y: parseInt($scope.num[4])
                }, {
                    name: $scope.ids_data[5],
                    y: parseInt($scope.num[5])
                }, {
                    name: $scope.ids_data[6],
                    y: parseInt($scope.num[6])
                }, {
                    name: $scope.ids_data[7],
                    y: parseInt($scope.num[7])
                }, {
                    name: $scope.ids_data[8],
                    y: parseInt($scope.num[8])
                }, {
                    name: $scope.ids_data[9],
                    y: parseInt($scope.num[9])
                }]
            }]
        }
        $scope.pie();
    }

}

App.controller('MshowCtrl', MshowCtrl);
function MshowCtrl($scope, $http,NgMap,$rootScope) {
    console.log($rootScope.user);
    $scope.id=$rootScope.user;
    $scope.m_and_s="";
    $scope.musicboxs="";
    $scope.showroom_detail="";
    $scope.list_musicbox_id=[];
    $scope.list_musicbox_name=[];
    $scope.list_pos=[];
    $scope.newpos=[];
    $scope.addBtn=false;
    $scope.new=false;

    $scope.loadData = function () {
        $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getMandSData.php/?showroom_id="+ $scope.id)
            .then(function successCallback(response) {
                console.log(response);
                $scope.m_and_s = response.data.m_and_s;
                if(response.data.error==true)
                {
                    console.log("error");
                    $scope.new=true;
                }
                else{
                    $scope.selectedM_and_S= $scope.m_and_s[0];
                    $scope.new=false;
                }
         

            }, function errorCallback(response) {
                console.log(response);
            });

            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getMusicBoxData.php")
            .then(function successCallback(response) {
                console.log(response);
                $scope.musicboxs = response.data.musicboxs;
                $scope.push_MusicBox_id();

            }, function errorCallback(response) {
                console.log(response);
            });
            $http.get("http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/getShowroomData.php/?showroom_id="+$scope.id)
            .then(function successCallback(response) {
                console.log(response);
                $scope.showroom_detail = response.data.showroom;

            }, function errorCallback(response) {
                console.log(response);
            });
    }
    $scope.loadData();

    $scope.selectM_and_S= function (index) {
        $scope.selectedM_and_S= $scope.m_and_s[index];
    }

    $scope.selectM_and_S2= function (name) {
        for(var j=0;j<$scope.musicboxs.length;j++){
            if(name==$scope.musicboxs[j].name)
            {
                $scope.selectedM_and_S= $scope.musicboxs[j];
            }
        }
        $scope.addBtn=true;
        // for(var i =0;i<9;i++){
        //     console.log("m="+$scope.selectedM[i]);
        // }
       
    

    }

    $scope.newpos_id = [];
    $scope.match_ID_and_name = function(arr_name){
        $scope.newpos_id = [];
        for (var i = 0 ;i< arr_name.length;i++){
            for(var j =0 ; j<$scope.list_musicbox_name.length;j++){
                if(arr_name[i]==$scope.list_musicbox_name[j]){
                    $scope.newpos_id[i]=$scope.list_musicbox_id[j];
                }
                
            }
        }
        console.log($scope.newpos_id);

    }

    $scope.SubmitPos = function(){
        var pos={};
        
        $scope.newpos=[];
        $scope.newpos_name = [];
        $scope.musicID_of_mands=[];//9tua

        if($scope.new==false){
            for(var t=0;t<9;t++){
                $scope.musicID_of_mands[t]="none";
                for(var j=0;j<$scope.m_and_s.length;j++){
                    if($scope.m_and_s[j].position==t+1)
                    {
                        $scope.musicID_of_mands[t]=$scope.m_and_s[j].name;
                    }
                }
            }
            console.log( "aaa ="+$scope.musicID_of_mands);
        }
        
        for(var i=0;i<9;i++)
        {
            if($scope.selectedM[i]==undefined){
                if($scope.new==false)
                {
                    $scope.newpos.push($scope.musicID_of_mands[i]);
                }
                else
                {
                    $scope.newpos.push("none");
                }
              
            }
            else{
                $scope.newpos.push($scope.selectedM[i]);
            }
           
        }
        $scope.match_ID_and_name($scope.newpos);
        $scope.newpos = $scope.newpos_id;
       
        pos["m1"] = $scope.newpos[0];
        pos["m2"] = $scope.newpos[1];
        pos["m3"] = $scope.newpos[2];
        pos["m4"] = $scope.newpos[3];
        pos["m5"] = $scope.newpos[4];
        pos["m6"] = $scope.newpos[5];
        pos["m7"] = $scope.newpos[6];
        pos["m8"] = $scope.newpos[7];
        pos["m9"] = $scope.newpos[8];
        
       // console.log(pos);
        console.log("newpos = "+$scope.newpos);
        
        $http({
            method: 'PUT',
            url: 'http://202.28.24.69/~oasys10/SSS_web/SSS_web_api/putMandSData.php/?showroom_id='+$scope.id,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            data: pos,
        })
            .then(function successCallback(response) {
                console.log(response);
                $scope.loadData();
                if (response.data.error == true) {
                    $scope.errorMessage = "Error,Please try again";
                    console.log("error");
                }
                else {
                    $scope.addMessage = "Succesfully updated";
                    console.log("success");
                }

            }, function errorCallback(response) {
                console.log(response);
                $scope.errorMessage = "Error,Please try again";
               // console.log("error");
            });
        
    }
    $scope.push_MusicBox_id = function(){
        $scope.list_musicbox_id=[];
        $scope.list_musicbox_name=[];
        $scope.list_musicbox_id[0]="0";
        $scope.list_musicbox_name[0]="none";
        for(var i=0;i<$scope.musicboxs.length;i++){
            $scope.list_musicbox_id.push($scope.musicboxs[i].music_box_id);
            $scope.list_musicbox_name.push($scope.musicboxs[i].name);
        }
        console.log($scope.list_musicbox_id);
        console.log($scope.list_musicbox_name);
    }



}



