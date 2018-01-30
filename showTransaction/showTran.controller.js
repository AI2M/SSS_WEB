var app = angular.module("ShowTranApp", ['chart.js', 'ui.bootstrap']);

app.controller("ShowTranCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.transactions = "";
    $http.get("http://localhost:3000/transactions")
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
            $scope.transactions = response.data;
            $scope.MusicBoxChart();
            //console.log($scope.transactions.length);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    $scope.selectedTransaction = $scope.transactions[0];
    $scope.selectTransaction = function (index) {
        $scope.selectedTransaction = $scope.transactions[index];
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;
        $scope.addMessage = undefined;
    }
 
    $scope.ids_data = [];
    $scope.num = [];
    $scope.MusicBoxChart = function(){
        var data = $scope.transactions;

        for(var i =0;i<$scope.transactions.length;i++){
            if ( $scope.ids_data.indexOf(data[i].music_box_id) == -1) {
                $scope.ids_data.push(data[i].music_box_id);
            }
        }
        for(var p = 0 ; p<$scope.ids_data.length;p++){
            $scope.num[p]=0;
        }

        for(var j =0; j <$scope.transactions.length;j++){
            for(var k =0; k <$scope.ids_data.length;k++){
                if(data[j].music_box_id==$scope.ids_data[k]){
                    $scope.num[k]+=1;
                }
            }
            
        }
        
        for(var l = 0 ; l<$scope.ids_data.length;l++){
            $scope.ids_data[l] = "id"+$scope.ids_data[l];
        }
        console.log($scope.ids_data); 
        console.log($scope.num); 
    }

    

   // $scope.aaaa();


}]);

app.controller("DoughnutCtrl", function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];
});

app.controller("DropDownCtrl", function($scope) {

    $scope.items= ["Showroom","Music Box"];
    $scope.Change = function(item){
        if(item=="Showroom"){
            console.log("click Showroom");
        }
        else{
            console.log("click Music Box");
        }

    }
});



