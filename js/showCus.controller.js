var app = angular.module("SSS", ['chart.js', 'ui.bootstrap']);
app.controller("ShowCusCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.customers = "";
    $http.get("http://localhost:3000/customers")
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
            $scope.customers = response.data;
            $scope.AgeChart();
            //console.log($scope.transactions.length);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
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

        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.ids_data.indexOf(data[i].age) == -1) {
                $scope.ids_data.push(data[i].age);
            }
        }
        for (var p = 0; p < $scope.ids_data.length; p++) {
            $scope.num[p] = 0;
        }

        for (var j = 0; j < $scope.customers.length; j++) {
            for (var k = 0; k < $scope.ids_data.length; k++) {
                if (data[j].age == $scope.ids_data[k]) {
                    $scope.num[k] += 1;
                }
            }

        }

        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "Age " + $scope.ids_data[l];
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }

    $scope.SexChart = function () {
        $scope.nameDoughnutChart = " Customer SexChart";
        $scope.ids_data = [];
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.ids_data.indexOf(data[i].sex) == -1) {
                $scope.ids_data.push(data[i].sex);
            }
        }
        for (var p = 0; p < $scope.ids_data.length; p++) {
            $scope.num[p] = 0;
        }

        for (var j = 0; j < $scope.customers.length; j++) {
            for (var k = 0; k < $scope.ids_data.length; k++) {
                if (data[j].sex == $scope.ids_data[k]) {
                    $scope.num[k] += 1;
                }
            }

        }

        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "Sex " + $scope.ids_data[l];
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }

    $scope.JobChart = function () {
        $scope.nameDoughnutChart = " Customer JobChart";
        $scope.ids_data = [];
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.ids_data.indexOf(data[i].job) == -1) {
                $scope.ids_data.push(data[i].job);
            }
        }
        for (var p = 0; p < $scope.ids_data.length; p++) {
            $scope.num[p] = 0;
        }

        for (var j = 0; j < $scope.customers.length; j++) {
            for (var k = 0; k < $scope.ids_data.length; k++) {
                if (data[j].job == $scope.ids_data[k]) {
                    $scope.num[k] += 1;
                }
            }

        }

        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "Job " + $scope.ids_data[l];
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }

    $scope.SalaryChart = function () {
        $scope.nameDoughnutChart = " Customer SalaryChart";
        $scope.ids_data = [];
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.ids_data.indexOf(data[i].salary) == -1) {
                $scope.ids_data.push(data[i].salary);
            }
        }
        for (var p = 0; p < $scope.ids_data.length; p++) {
            $scope.num[p] = 0;
        }

        for (var j = 0; j < $scope.customers.length; j++) {
            for (var k = 0; k < $scope.ids_data.length; k++) {
                if (data[j].salary == $scope.ids_data[k]) {
                    $scope.num[k] += 1;
                }
            }

        }

        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "Salary " + $scope.ids_data[l];
        }
        console.log($scope.ids_data);
        console.log($scope.num);
    }
    $scope.ShowroomChart = function () {
        $scope.nameDoughnutChart = " Customer ShowroomChart";
        $scope.ids_data = [];
        $scope.num = [];
        var data = $scope.customers;

        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.ids_data.indexOf(data[i].showroom_id) == -1) {
                $scope.ids_data.push(data[i].showroom_id);
            }
        }
        for (var p = 0; p < $scope.ids_data.length; p++) {
            $scope.num[p] = 0;
        }

        for (var j = 0; j < $scope.customers.length; j++) {
            for (var k = 0; k < $scope.ids_data.length; k++) {
                if (data[j].showroom_id == $scope.ids_data[k]) {
                    $scope.num[k] += 1;
                }
            }

        }

        for (var l = 0; l < $scope.ids_data.length; l++) {
            $scope.ids_data[l] = "Showroom_Id " + $scope.ids_data[l];
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
