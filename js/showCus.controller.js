var app = angular.module("SSS", ['chart.js', 'ui.bootstrap']);
app.controller("ShowCusCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.customers = "";
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

}]);

app.controller('TabsDemoCtrl', function ($scope, $window) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  
    $scope.alertMe = function() {
      setTimeout(function() {
        $window.alert('You\'ve selected the alert tab!');
      });
    };
  
    $scope.model = {
      name: 'Tabs'
    };
  });
