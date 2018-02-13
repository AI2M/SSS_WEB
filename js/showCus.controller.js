var app = angular.module("SSS", ['chart.js', 'ui.bootstrap','datatables']);
app.controller('ShowCusCtrl', ShowCusCtrl);
function ShowCusCtrl(DTOptionsBuilder, DTColumnBuilder,$http, $q, $interval, $compile ,$scope) {

    $scope.customers = "";
    $scope.Col2 = "Count";
    $scope.loadData = function(type){
        if(type==1){
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=age")
            .then(function successCallback(response) {
                console.log(response);
                $scope.customers = response.data.customers;
                $scope.AgeChart();

            }, function errorCallback(response) {
                console.log(response);
            });
            $scope.tabletype = 1; 
            $scope.Col1 = "Age";  
        }
        else if(type==2){
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=sex")
            .then(function successCallback(response) {
                console.log(response);
                $scope.customers = response.data.customers;
                $scope.SexChart();

            }, function errorCallback(response) {
                console.log(response);
            });
            $scope.tabletype = 2; 
            $scope.Col1 = "Sex";
        }
        else if(type==3){ 
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=job")
            .then(function successCallback(response) {
                console.log(response);
                $scope.customers = response.data.customers;
                $scope.JobChart();

            }, function errorCallback(response) {
                console.log(response);
            });
            $scope.tabletype = 3; 
            $scope.Col1 = "Job";
        }
        else if(type==4){
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=salary")
            .then(function successCallback(response) {
                console.log(response);
                $scope.customers = response.data.customers;
                $scope.SalaryChart();

            }, function errorCallback(response) {
                console.log(response);
            });
            $scope.tabletype = 4; 
            $scope.Col1 = "Salary";
        }
        else if(type==5){
            $http.get("http://localhost/SSS_web_api/getCustomerData.php/?type=showroom_id")
            .then(function successCallback(response) {
                console.log(response);
                $scope.customers = response.data.customers;
                $scope.ShowroomChart();

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
                $scope.ids_data.push("Age " + data[i].age);
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
                $scope.ids_data.push("sex " + data[i].sex);
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
                $scope.ids_data.push("job " + data[i].job);
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
                $scope.ids_data.push("salary " + data[i].salary);
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
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < data.length; i++) {
            if ($scope.ids_data.indexOf(data[i].showroom_id) == -1) {
                $scope.ids_data.push("showroom_id " + data[i].showroom_id);
            }
        }
        for (var j = 0; j < data.length; j++) {
            $scope.num.push(data[j].counts);
         }
        console.log($scope.ids_data);
        console.log($scope.num);
    }
    

    //datatable
    var vm = this;
    vm.dtInstance = {};
    vm.reloadData = reloadData;

    $scope.loadTable = function(){
        vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
            var datain = "";
            var defer = $q.defer();
            // var data = {'url' : 'http://139.59.251.210/api-prevent/ajax/getallrounds'};
            // $http.get('http://l-lin.github.io/angular-datatables/archives/data.json')
    
            $http({
                method : 'GET',
                url :'http://localhost/SSS_web_api/getCustomerData.php/?type=all',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                 },
                // data: data,
            })
            .then(function(result) {
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

}

