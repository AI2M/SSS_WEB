var app = angular.module("SSS", ['chart.js', 'ui.bootstrap', 'datatables', 'ngMap']);

app.controller('ShowTranCtrl', ShowTranCtrl);
function ShowTranCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope, NgMap) {
    var vm = this;
    vm.dtInstance = {};
    // vm.newPromise = newPromise;
    vm.reloadData = reloadData;
    // vm.newPromise = newPromise;

    var api_url = 'http://localhost/SSS_web_api/getTransactionData.php/?type=all';
    $scope.transactions = "";
    $scope.transactionMaps = "";
    $scope.musicboxs = "";
    $scope.showrooms = "";
    $scope.tab_month = false;
    $scope.tab_7day = false;
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
    $http.get("http://localhost/SSS_web_api/getShowroomData.php")
        .then(function successCallback(response) {
            $scope.showrooms = response.data.showrooms;
            // console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    $http.get("http://localhost/SSS_web_api/getMusicBoxData.php")
        .then(function successCallback(response) {
            $scope.musicboxs = response.data.musicboxs;
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
            $http.get("http://localhost/SSS_web_api/getTransactionData.php/?type=thismonth")
                .then(function successCallback(response) {
                    // api_url='http://localhost/SSS_web_api/getTransactionData.php/?type=thismonth';
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
            $http.get("http://localhost/SSS_web_api/getTransactionData.php/?type=thisyear")
                .then(function successCallback(response) {
                    // api_url='http://localhost/SSS_web_api/getTransactionData.php/?type=thisyear';

                    console.log(response);
                    $scope.transactions = response.data.transactions;
                    $scope.LineChart(2);
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
            $scope.date7 = $scope.x_axis[6] + "/" + (now.getMonth() + 1) +"/"+now.getFullYear() ;
            $scope.date1 = $scope.x_axis[0] + "/" + (now.getMonth() + 1) +"/"+now.getFullYear() ;
            $scope.nameLineChart = "Last 7 Day Engagements , Between "+$scope.date1+" - "+$scope.date7;
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
            $scope.namemonth = ["January","February","March","April","May","June","July" ,"August"
            ,"September","October","November","December"]
            $scope.nameLineChart = "This Month Engagements , Now "+$scope.namemonth[$scope.thismonth];
            
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
            $scope.nameLineChart = "This Year Engagements , Now "+$scope.thisyear;
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
