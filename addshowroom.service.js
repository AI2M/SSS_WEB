(function(){
    var app = angular.module("AddshowroomApp");
 

    app.service("AppDataServiceSvc", function Appconfig(AppnameSvc){
        this.name = AppnameSvc;
        this.author = "apotoxin";
        this.builtDate = new Date().toDateString();
    });
})();
