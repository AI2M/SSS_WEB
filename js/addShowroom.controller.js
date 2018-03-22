var app = angular.module("SSS", ['ngMap', 'datatables']);
app.controller('AddShowroomCtrl', AddShowroomCtrl);
function AddShowroomCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope, NgMap,fileUploadService) {

    $scope.editMode = false;
    $scope.addMode = false;
    $scope.lalong = [];
    var file;
    var file2;
    $scope.filename = "Choose picture";
    $scope.image_url = "";

    $scope.loadData = function () {
        $http.get("http://localhost/SSS_web_api/getShowroomData.php")
            .then(function successCallback(response) {
                console.log(response);
                $scope.showrooms = response.data.showrooms;
                $scope.selectedShowroom = $scope.showrooms[0];
                $scope.image_url = "/Applications/XAMPP/xamppfiles/images/showrooms/showroom_pic"
                +$scope.selectedShowroom.showroom_id+".jpg"
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
        +$scope.selectedShowroom.showroom_id+".jpg"
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

            if($scope.myFile!=undefined){
                $http({
                    method: 'POST',
                    url: 'http://localhost/SSS_web_api/postShowroomData.php',
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
            else{
                $scope.errorMessage = "Error,Please choose picture";
                $scope.selectedShowroom = $scope.showrooms[0];
                $scope.image_url = "/Applications/XAMPP/xamppfiles/images/showrooms/showroom_pic"
                +$scope.selectedShowroom.showroom_id+".jpg"
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
                url: 'http://localhost/SSS_web_api/putShowroomData.php',
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
        $http.delete("http://localhost/SSS_web_api/deleteShowroomData.php/?showroom_id=" + showroomData.showroom_id)
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
        +$scope.selectedShowroom.showroom_id+".jpg"


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
            url: 'http://localhost/SSS_web_api/getShowroomData.php',
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
            url: 'http://localhost/SSS_web_api/getShowroomData.php',
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
                +$scope.selectedShowroom.showroom_id+".jpg"
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
        var newfilename ="showroom_pic"+$scope.selectedShowroom.showroom_id+".jpg";
        var uploadUrl = "http://localhost/SSS_web_api/server_SH_pic.php", //Url of web service
            promise = fileUploadService.uploadFileToUrl(file,newfilename, uploadUrl);

        promise.then(function (response) {
            $scope.serverResponse = response;
        }, function () {
            $scope.serverResponse = 'An error has occurred';
        })
        $scope.myFile = undefined;
    };

}