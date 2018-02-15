var app = angular.module("SSS", ['chart.js', 'ui.bootstrap', 'datatables','ngMap']);

app.controller('ShowTranCtrl', ShowTranCtrl);
function ShowTranCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope,NgMap) {
    var vm = this;
    vm.dtInstance = {};
    // vm.newPromise = newPromise;
    vm.reloadData = reloadData;
    // vm.newPromise = newPromise;

    var api_url = 'http://localhost/SSS_web_api/getTransactionData.php/?type=all';
    $scope.transactions = "";
    $scope.transactionMaps = "";
    var now = new Date();
    $scope.nowdate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

    $http.get("http://localhost/SSS_web_api/getTransactionMapData.php")
    .then(function successCallback(response) {
        $scope.transactionMaps = response.data.transactionMaps;
        $scope.AddPos();
        // console.log(response);
    }, function errorCallback(response) {
        console.log(response);
    });

    $scope.loadData = function (type) {
        if (type == 1) {
            //last7day
            $http.get("http://localhost/SSS_web_api/getTransactionData.php/?type=last7")
                .then(function successCallback(response) {
                    // api_url='http://localhost/SSS_web_api/getTransactionData.php/?type=last7';
                    // $scope.loadTable();
                    $scope.transactions = response.data.transactions;
                    $scope.BarChart(0);
                    $scope.ShowroomChart();
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else if (type == 2) {
            $http.get("http://localhost/SSS_web_api/getTransactionData.php/?type=thismonth")
                .then(function successCallback(response) {
                    // api_url='http://localhost/SSS_web_api/getTransactionData.php/?type=thismonth';
                    // $scope.loadTable();
                    console.log(response);
                    $scope.transactions = response.data.transactions;
                    $scope.BarChart(1);
                    $scope.ShowroomChart();
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else if (type == 3) {
            $http.get("http://localhost/SSS_web_api/getTransactionData.php/?type=thisyear")
                .then(function successCallback(response) {
                    // api_url='http://localhost/SSS_web_api/getTransactionData.php/?type=thisyear';

                    console.log(response);
                    $scope.transactions = response.data.transactions;
                    $scope.BarChart(2);
                    $scope.ShowroomChart();
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
        else {
            $http.get("http://localhost/SSS_web_api/getTransactionData.php/?type=all")
                .then(function successCallback(response) {
                    // api_url='http://localhost/SSS_web_api/getTransactionData.php/?type=all';

                    console.log(response);
                    $scope.transactions = response.data.transactions;
                    $scope.BarChart(3);
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
        // console.log($scope.ids_data);
        // console.log($scope.num);
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
        // console.log($scope.ids_data);
        // console.log($scope.num);
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
        var month = dates.getMonth() + 1;
        var data = $scope.transactions.data;
        //console.log(dates);
        $scope.series = ['MusicBox'];
        if (type == 0) {
            $scope.nameBarChart = "Last 7 Day";
            // last 7 day21
            $scope.x_axis = [];
            $scope.y_axis = [[]];
            var i, t;
            for (i = date; i > date - 7; i--) {
                if (i <= 0) {
                    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        j = i + 31;
                    }
                    else if (month == 4 || month == 6 || month == 9 || month == 11) {
                        j = i + 30;
                    }
                    else if (month == 2) {
                        j = i + 28;

                    }
                    $scope.x_axis.push(j);
                }
                else {
                    $scope.x_axis.push(i);
                }

            }
            for (var z = 0; z < 7; z++) {
                $scope.y_axis[z] = 0;
            }

            for (var p = 0; p < $scope.transactions.length; p++) {
                var date = new Date($scope.transactions[p].datetime).getDate();
                //console.log(date);
                for (var y = 0; y < $scope.x_axis.length; y++) {
                    if (date == $scope.x_axis[y]) {
                        $scope.y_axis[[y]] += 1;
                    }
                }

            }
            console.log($scope.x_axis);
            console.log($scope.y_axis);
        }
        else if (type == 1) {
            $scope.nameBarChart = "This Month";
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
                $scope.y_axis[z] = 0;
            }
            for (var p = 0; p < $scope.transactions.length; p++) {
                var date = new Date($scope.transactions[p].datetime).getDate();
                console.log(data);
                for (var y = 0; y < $scope.x_axis.length; y++) {
                    if (date == $scope.x_axis[y]) {
                        $scope.y_axis[[y]] += 1;
                    }
                }

            }
            // for(var r =0;r<$scope.x_axis.length;r++){
            //     $scope.x_axis[r]=  "date "+$scope.x_axis[r];
            // }

            console.log($scope.x_axis);
            console.log($scope.y_axis);

        }
        else {
            $scope.nameBarChart = "This Year";
            //this year
            $scope.x_axis = [];
            $scope.y_axis = [[]];

            $scope.month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $scope.x_axis = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];

            for (var z = 0; z < $scope.x_axis.length; z++) {
                $scope.y_axis[z] = 0;
            }
            for (var p = 0; p < $scope.transactions.length; p++) {
                var month = new Date($scope.transactions[p].datetime).getMonth() + 1;
                for (var y = 0; y < $scope.x_axis.length; y++) {
                    if (month == $scope.x_axis[y]) {
                        $scope.y_axis[[y]] += 1;
                    }
                }

            }

            for (var r = 0; r < $scope.x_axis.length; r++) {
                $scope.x_axis[r] = $scope.x_axis[r] + " " + $scope.month_name[r];
            }
            console.log($scope.x_axis);
            console.log($scope.y_axis);

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
            .withOption('order',[[0,'desc']]);
        vm.dtColumns = [
            DTColumnBuilder.newColumn('datetime').withTitle('Datetime'),
            DTColumnBuilder.newColumn('showroom_id').withTitle('Showroom ID'),


        ];

    }
    $scope.loadTable();



    // $interval(function() {
    // 	vm.dtInstance.changeData(vm.newPromise());
    // }, 300000);

    // function newPromise() {
    // 	var defer = $q.defer();
    //     // var data = {'url' : 'admindash/currentcon'};
    //     // $http.get('http://l-lin.github.io/angular-datatables/archives/data.json')

    //     $http({
    // 		method : 'GET',
    // 		url : api_url,
    // 		headers: {
    // 	    'Content-Type': 'application/json',
    // 	    'Accept': 'application/json'
    // 	 	},
    // 		// data: data,
    // 	})
    // 	.then(function(result) {
    // 		// console.log(result.data);
    // 		var datain = angular.fromJson(result.data.transactions);
    //         defer.resolve(datain);
    //         // defer.resolve(result.data);
    //     });
    //     return defer.promise;
    // }

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
    vm.value=[];
    vm.pic=[];
    $scope.AddPos = function(){
        for(var k = 0;k<$scope.transactionMaps.length;k++){
            vm.positions.push([$scope.transactionMaps[k].latitude, $scope.transactionMaps[k].longitude]);
            if($scope.transactionMaps[k].count<2){
                vm.pic.push("js/map/icon/m1.png");
            }
            else if($scope.transactionMaps[k].count<4){
                vm.pic.push("js/map/icon/m2.png");
            }
            else if($scope.transactionMaps[k].count<6){
                vm.pic.push("js/map/icon/m3.png");
            }
            else if($scope.transactionMaps[k].count<8){
                vm.pic.push("js/map/icon/m4.png");
            }
            else{
                vm.pic.push("js/map/icon/m5.png");
            }
            vm.value.push($scope.transactionMaps[k].count);
        }
        console.log("posss = "+vm.positions[0]);
        console.log("posss = "+vm.value);
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
  
    
    
    





}
