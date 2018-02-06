
var app = angular.module("SSS", []);
app.controller("AddShowroomCtrl", ['$scope', '$http', function ($scope, $http) {

    $scope.editMode = false;
    $scope.addMode = false;

    $scope.loadData = function () {
        $http.get("http://localhost/SSS_web_api/getShowroomData.php")
            .then(function successCallback(response) {
                console.log(response);
                $scope.showrooms = response.data.showrooms;
                $scope.selectedShowroom = $scope.showrooms[0];
            }, function errorCallback(response) {
                console.log(response);
            });
    }
    $scope.loadData();

    $scope.selectShowroom = function (index) {
        $scope.selectedShowroom = $scope.showrooms[index];
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
           
            $http({
                method: 'POST',
                url: 'http://localhost/SSS_web_api/postShowroomData.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'  },
                data: showroomData,
            })
            .then(function successCallback(response) {
                console.log(response);
                $scope.loadData();
                if(response.data.error == true){
                    $scope.errorMessage = "Error,Please try again";
                }
                else{
                    $scope.addMessage = "Succesfully added";
                }
            }, function errorCallback(response) {
                console.log(response);
                $scope.errorMessage = "Error,Please try again";
            });
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
                method: 'PUT',
                url: 'http://localhost/SSS_web_api/putShowroomData.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'  },
                data: showroomData,
            })
            .then(function successCallback(response) {
                console.log(response);
                $scope.loadData();
                if(response.data.error == true){
                    $scope.errorMessage = "Error,Please try again";
                }
                else{
                    $scope.addMessage = "Succesfully updated";
                }
            }, function errorCallback(response) {
                console.log(response);
                $scope.errorMessage = "Error,Please try again";
            });
        }
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
    }

    $scope.cancel = function () {
        $scope.toggleEditMode();
        $scope.selectedShowroom = $scope.showrooms[0];


    }


}]);



