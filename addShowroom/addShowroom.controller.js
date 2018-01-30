
var app = angular.module("AddShowroomApp", []);
app.controller("AddShowroomCtrl", ['$scope', '$http', function ($scope, $http) {

    $scope.editMode = false;
    $scope.addMode = false;

    $scope.loadData = function () {
        $http.get("http://localhost:3000/showrooms")
            .then(function successCallback(response) {
                console.log(response);
                $scope.showrooms = response.data;
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
            //addmode
            $http.post("http://localhost:3000/showrooms/", showroomData)
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
            $http.put("http://localhost:3000/showrooms/" + showroomData.id, showroomData)
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.successMessage = "Succesfully updated";
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.errorMessage = "Error,Please try again";
                });
        }
    }

    $scope.deleteShowroom = function () {
        var showroomData = $scope.selectedShowroom;
        $http.delete("http://localhost:3000/showrooms/" + showroomData.id, showroomData)
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
            "id": new Date().toTimeString()
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



