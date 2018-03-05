
var app = angular.module("SSS",['ngMap']);
app.controller("MshowCtrl", ['$scope', '$http','NgMap', function ($scope, $http,NgMap) {
    
    $scope.id=10;
    $scope.m_and_s="";
    $scope.musicboxs="";
    $scope.showroom_detail="";
    $scope.list_musicbox_id=[];
    $scope.list_musicbox_name=[];
    $scope.list_pos=[];
    $scope.newpos=[];
    $scope.addBtn=false;
    $scope.new=false;

    $scope.loadData = function () {
        $http.get("http://localhost/SSS_web_api/getMandSData.php/?showroom_id="+ $scope.id)
            .then(function successCallback(response) {
                console.log(response);
                $scope.m_and_s = response.data.m_and_s;
                if(response.data.error==true)
                {
                    console.log("error");
                    $scope.new=true;
                }
                else{
                    $scope.selectedM_and_S= $scope.m_and_s[0];
                    $scope.new=false;
                }
         

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

    $scope.selectM_and_S2= function (name) {
        for(var j=0;j<$scope.musicboxs.length;j++){
            if(name==$scope.musicboxs[j].name)
            {
                $scope.selectedM_and_S= $scope.musicboxs[j];
            }
        }
        $scope.addBtn=true;
        // for(var i =0;i<9;i++){
        //     console.log("m="+$scope.selectedM[i]);
        // }
       
    

    }

    $scope.newpos_id = [];
    $scope.match_ID_and_name = function(arr_name){
        $scope.newpos_id = [];
        for (var i = 0 ;i< arr_name.length;i++){
            for(var j =0 ; j<$scope.list_musicbox_name.length;j++){
                if(arr_name[i]==$scope.list_musicbox_name[j]){
                    $scope.newpos_id[i]=$scope.list_musicbox_id[j];
                }
                
            }
        }
        console.log($scope.newpos_id);

    }

    $scope.SubmitPos = function(){
        var pos={};
        
        $scope.newpos=[];
        $scope.newpos_name = [];
        $scope.musicID_of_mands=[];//9tua

        if($scope.new==false){
            for(var t=0;t<9;t++){
                $scope.musicID_of_mands[t]="none";
                for(var j=0;j<$scope.m_and_s.length;j++){
                    if($scope.m_and_s[j].position==t+1)
                    {
                        $scope.musicID_of_mands[t]=$scope.m_and_s[j].name;
                    }
                }
            }
            console.log( "aaa ="+$scope.musicID_of_mands);
        }
        
        for(var i=0;i<9;i++)
        {
            if($scope.selectedM[i]==undefined){
                if($scope.new==false)
                {
                    $scope.newpos.push($scope.musicID_of_mands[i]);
                }
                else
                {
                    $scope.newpos.push("none");
                }
              
            }
            else{
                $scope.newpos.push($scope.selectedM[i]);
            }
           
        }
        $scope.match_ID_and_name($scope.newpos);
        $scope.newpos = $scope.newpos_id;
       
        pos["m1"] = $scope.newpos[0];
        pos["m2"] = $scope.newpos[1];
        pos["m3"] = $scope.newpos[2];
        pos["m4"] = $scope.newpos[3];
        pos["m5"] = $scope.newpos[4];
        pos["m6"] = $scope.newpos[5];
        pos["m7"] = $scope.newpos[6];
        pos["m8"] = $scope.newpos[7];
        pos["m9"] = $scope.newpos[8];
        
       // console.log(pos);
        console.log("newpos = "+$scope.newpos);
        
        $http({
            method: 'PUT',
            url: 'http://localhost/SSS_web_api/putMandSData.php/?showroom_id='+$scope.id,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            data: pos,
        })
            .then(function successCallback(response) {
                console.log(response);
                $scope.loadData();
                if (response.data.error == true) {
                    $scope.errorMessage = "Error,Please try again";
                    console.log("error");
                }
                else {
                    $scope.addMessage = "Succesfully updated";
                    console.log("success");
                }

            }, function errorCallback(response) {
                console.log(response);
                $scope.errorMessage = "Error,Please try again";
               // console.log("error");
            });
        
    }
    $scope.push_MusicBox_id = function(){
        $scope.list_musicbox_id=[];
        $scope.list_musicbox_name=[];
        $scope.list_musicbox_id[0]="0";
        $scope.list_musicbox_name[0]="none";
        for(var i=0;i<$scope.musicboxs.length;i++){
            $scope.list_musicbox_id.push($scope.musicboxs[i].music_box_id);
            $scope.list_musicbox_name.push($scope.musicboxs[i].name);
        }
        console.log($scope.list_musicbox_id);
        console.log($scope.list_musicbox_name);
    }



}]);



