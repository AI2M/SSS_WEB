var app = angular.module("ShowTranApp", ['chart.js', 'ui.bootstrap']);

app.controller("ShowTranCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.transactions = "";
    $http.get("http://localhost:3000/transactions")
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
            $scope.transactions = response.data;
            $scope.ShowroomChart();
            $scope.BarChart(0);
            //console.log($scope.transactions.length);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    //select data 
    // $scope.selectedTransaction = $scope.transactions[0];
    // $scope.selectTransaction = function (index) {
    //     $scope.selectedTransaction = $scope.transactions[index];
    //     $scope.successMessage = undefined;
    //     $scope.errorMessage = undefined;
    //     $scope.addMessage = undefined;
    // }

    //chart of musicbox
    $scope.MusicBoxChart = function () {
        $scope.nameDoughnutChart = "MusicBoxChart";
        $scope.ids_data = [];
        $scope.num = [];
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

        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "MusicBox_id " + $scope.ids_data[l];
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }

    //chart of showroom
    $scope.ShowroomChart = function () {
        $scope.nameDoughnutChart = "ShowroomChart";
        $scope.ids_data = [];
        $scope.num = [];
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

        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "Showroom_id " + $scope.ids_data[l];
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }

    //dropdown
    $scope.DropdownItems = ["Showroom", "Music Box"];
    $scope.Change = function (DropdownItems) {
        if (DropdownItems == "Showroom") {
            console.log("click Showroom");
            $scope.ShowroomChart();
            
        }
        else {
            console.log("click Music Box");
            $scope.MusicBoxChart();
            
        }

    }

    //bar chart
    $scope.BarChart = function(type){
        var date = new Date();
        $scope.series = ['MusicBox'];

        if(type==0){
            $scope.nameBarChart = "Last 7 Day";
            // last 7 day
        $scope.x_axis = ['7', '8', '9', '10', '11', '12', '13'];
        $scope.y_axis = [[65, 59, 80, 81, 56, 55, 90]];
        }
        else if(type==1) {
            $scope.nameBarChart = "This Month";
            //this month
            var month  = date.getMonth();
            $scope.x_axis = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                            '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
            $scope.y_axis =  [[65, 59, 80, 81, 56, 55, 90, 56, 55, 90,
                65, 59, 80, 81, 56, 55, 90, 56, 55, 90,
                65, 59, 80, 81, 56, 55, 90, 56, 55, 90]];
            
        }
        else  {
            $scope.nameBarChart = "This Year";
            //this year
            var year  = date.getFullYear();
            $scope.x_axis = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
            $scope.y_axis = [[65, 59, 80, 81, 56, 55, 90, 56, 55, 90,
                65, 59]];
        }
    }
    

}]);



