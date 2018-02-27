var app = angular.module("SSS", ['ui.bootstrap', 'datatables']);
app.controller('ShowCusCtrl', ShowCusCtrl);
function ShowCusCtrl(DTOptionsBuilder, DTColumnBuilder, $http, $q, $interval, $compile, $scope, $location, $window) {

    $scope.customers = "";
    $scope.customersall = "";
    $scope.Col2 = "Count";
    $scope.nameDoughnutChart = "";
    $scope.ids_data = [];
    $scope.num = [];

    $scope.loadData = function (type) {
        $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=all")
                .then(function successCallback(response) {
                    console.log(response);
                    $scope.customersall = response.data.customers;

                }, function errorCallback(response) {
                    console.log(response);
                });
        if (type == 1) {
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=age")
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
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=sex")
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
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=job")
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
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=salary")
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
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=showroom_id")
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
        for(var i = 0 ;i< $scope.ids_data.length;i++){
            for(var k = 0 ; k<$scope.customersall.length;k++){
                if($scope.ids_data[i]==$scope.customersall[k].showroom_id){
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
                url: 'http://localhost/SSS_web_api/getCustomerData.php/?type=all',
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
            DTColumnBuilder.newColumn('sex').notSortable().withTitle('Sex'),
            DTColumnBuilder.newColumn('age').notSortable().withTitle('Age'),
            DTColumnBuilder.newColumn('job').notSortable().withTitle('Job'),
            DTColumnBuilder.newColumn('showroom_id').withTitle('Showroom ID'),
            DTColumnBuilder.newColumn('location').notSortable().withTitle('Showroom name'),
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
                        format: '<b>{point.name}</b> : {point.y} customer',
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

