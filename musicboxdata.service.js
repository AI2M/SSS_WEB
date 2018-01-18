(function(){
    var app = angular.module("AddshowroomApp");
    app.service("MusicBoxDataServiceSvc", function($http){
       
        var self = this;
        self.getMusicbox = function(){

           var promise1 =  $http.get("http://localhost:3000/musicboxs")
           var promise2 = promise1.then(function(response){
            return response.data;

        });
        return promise2;

        }

        self.saveMusic = function(musicboxData){
           
           return $http.put("http://localhost:3000/musicboxs/"+musicboxData.id,musicboxData)
            .then(function(response){
                console.log(response);
            });
        }

        self.createMusic = function(musicboxData){
           
            return $http.post("http://localhost:3000/musicboxs/",musicboxData)
             .then(function(response){
                 console.log(response);
             });
         }

         self.deleteMusic = function(musicboxData){
           
            return $http.delete("http://localhost:3000/musicboxs/"+musicboxData.id,musicboxData)
             .then(function(response){
                 console.log(response);
             });
         }

        
    });
})();
