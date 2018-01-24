(function(){
    var app = angular.module("AddShowroomApp");
    app.service("ShowroomDataServiceSvc", function($http){
       
        var self = this;
        self.getShowroom= function(){

           var promise1 =  $http.get("http://localhost:3000/showrooms")
           var promise2 = promise1.then(function(response){
            return response.data;

        });
        return promise2;

        }

        self.saveShowroom = function(showroomData){
           
           return $http.put("http://localhost:3000/showrooms/"+showroomData.id,showroomData)
            .then(function(response){
                console.log(response);
            });
        }

        self.createShowroom = function(showroomData){
           
            return $http.post("http://localhost:3000/showrooms/",showroomData)
             .then(function(response){
                 console.log(response);
             });
         }

         self.deleteShowroom = function(showroomData){
           
            return $http.delete("http://localhost:3000/showrooms/"+showroomData.id,showroomData)
             .then(function(response){
                 console.log(response);
             });
         }

        
    });
})();
