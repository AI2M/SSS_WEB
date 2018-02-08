var app = angular.module("SSS", ['chart.js', 'ui.bootstrap']);

app.controller("ShowTranCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.transactions = "";
    $scope.loadData = function (type) {
        if (type==1) {
            //last7day
            $http.get("http://localhost/SSS_web_api/getTransactionData.php/?type=last7")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.transactions = response.data.transactions;
                    $scope.BarChart(0);
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else if(type==2){
            $http.get("http://localhost:3000/transactions/?type=thismonth")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.transactions = response.data.transactions;
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else if(type==3){
            $http.get("http://localhost:3000/transactions/?type=thisyear")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.transactions = response.data.transactions;
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else{
            $http.get("http://localhost:3000/transactions/?type=all")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.transactions = response.data.transactions;
                }, function errorCallback(response) {
                    console.log(response);
                });
            
        }

    }



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
    $scope.loadData(1);
    //bar chart

    $scope.BarChart = function (type) {
        var dates = new Date();
        var date = dates.getDate();
        var month = dates.getMonth()+1;
        var data = $scope.transactions.data;
        console.log(dates);
        $scope.series = ['MusicBox'];
        if (type == 0) {
            $scope.nameBarChart = "Last 7 Day";
            // last 7 day21
            $scope.x_axis =[];
            $scope.y_axis = [[]];
            var i,t;
            for(i=date;i>date-7;i--){
                if(i<=0){
                    if(month == 1||month == 3||month == 5||month == 7||month == 8||month == 10||month == 12){
                       j= i+31;
                    }
                    else if(month == 4||month == 6||month == 9||month == 11){
                        j =i+30;
                    }
                    else if(month == 2){
                        j = i+28;
                        
                    }
                    $scope.x_axis.push(j);
                }
                else{
                    $scope.x_axis.push(i);
                }
                
            }
            for (var z = 0; z < 7; z++) {
                $scope.y_axis[z] = 0;
            }

            for (var p = 0; p < $scope.transactions.length; p++) {
                var date = new Date($scope.transactions[p].datetime).getDate();
                console.log(date);
                for(var y = 0;y<$scope.x_axis.length;y++){
                    if(date==$scope.x_axis[y]){
                        $scope.y_axis[[y]]+=1;
                    }
                }
                
            }
            console.log($scope.x_axis);
            console.log($scope.y_axis);
        }
        else if (type == 1) {
            $scope.nameBarChart = "This Month";
            //this month
            var month = date.getMonth();
            $scope.x_axis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
            $scope.y_axis = [[65, 59, 80, 81, 56, 55, 90, 56, 55, 90,
                65, 59, 80, 81, 56, 55, 90, 56, 55, 90,
                65, 59, 80, 81, 56, 55, 90, 56, 55, 90]];

        }
        else {
            $scope.nameBarChart = "This Year";
            //this year
            var year = date.getFullYear();
            $scope.x_axis = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $scope.y_axis = [[65, 59, 80, 81, 56, 55, 90, 56, 55, 90,
                65, 59]];
        }
    }

}]);



