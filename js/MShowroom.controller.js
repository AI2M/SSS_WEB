
var app = angular.module("SSS",['ngMap']);
app.controller("MshowCtrl", ['$scope', '$http','NgMap', function ($scope, $http,NgMap) {
    
    $scope.id=1;
    $scope.m_and_s="";
    $scope.musicboxs="";
    $scope.showroom_detail="";
    $scope.list_musicbox_id=[];
    $scope.list_pos=[];

    $scope.loadData = function () {
        $http.get("http://localhost/SSS_web_api/getMandSData.php/?showroom_id="+ $scope.id)
            .then(function successCallback(response) {
                console.log(response);
                $scope.m_and_s = response.data.m_and_s;
                $scope.selectedM_and_S= $scope.m_and_s[0];

            }, function errorCallback(response) {
                console.log(response);
            });

            $http.get("http://localhost/SSS_web_api/getMusicBoxData.php")
            .then(function successCallback(response) {
                console.log(response);
                $scope.musicboxs = response.data.musicboxs;
                $scope.push_MusicBox_id();

            }, function errorCallback(response) {
                console.log(response);
            });
            $http.get("http://localhost/SSS_web_api/getShowroomData.php/?showroom_id="+$scope.id)
            .then(function successCallback(response) {
                console.log(response);
                $scope.showroom_detail = response.data.showroom;

            }, function errorCallback(response) {
                console.log(response);
            });
    }
    $scope.loadData();

    $scope.selectM_and_S= function (index) {
        $scope.selectedM_and_S= $scope.m_and_s[index];
    }

    $scope.selectM_and_S2= function (id) {
        for(var j=0;j<$scope.musicboxs.length;j++){
            if(id==$scope.musicboxs[j].music_box_id)
            {
                $scope.selectedM_and_S= $scope.m_and_s[j];
            }
        }
        // for(var i =0;i<9;i++){
        //     console.log("m="+$scope.selectedM[i]);
        // }
       
    

    }

    $scope.SubmitPos = function(){
  
    }
    $scope.push_MusicBox_id = function(){
        for(var i=0;i<$scope.musicboxs.length;i++){
            $scope.list_musicbox_id.push($scope.musicboxs[i].music_box_id);
        }
        console.log($scope.list_musicbox_id);
    }



}]);



