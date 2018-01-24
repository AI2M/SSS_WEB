var app = angular.module("AddShowroomApp", []);

(function () {
    var app = angular.module("AddShowroomApp");
    app.controller("AddShowroomCtrl", AddShowroomCtrl);

    function AddShowroomCtrl(ShowroomDataServiceSvc) {
        var self = this;
        self.editMode = false;
        self.addMode = false;

        this.loadData = function(){
            ShowroomDataServiceSvc.getShowroom()
            .then(function (data) {
                self.showrooms = null;
                self.showrooms = data;
                self.selectedShowroom = self.showrooms[0];
                

            });
        }      
        self.loadData();

        this.saveShowroom = function () {
            self.successMessage = undefined;
            self.errorMessage = undefined;
            self.addMessage = undefined;
            this.editMode = !this.editMode;
            var showroomData = this.selectedShowroom;
            if (self.addMode) {
                ShowroomDataServiceSvc.createShowroom(showroomData)
                    .then(function () {
                        self.loadData();
                        self.addMessage = "Succesfully added";
                        
                    },
                    function () {
                        self.errorMessage = "Error,Please try again";
                    }
                    );
                self.addMode = false;
            }
            else {
                ShowroomDataServiceSvc.saveShowroom(showroomData)
                    .then(function () {
                        self.successMessage = "Succesfully updated";
                    },
                    function () {
                        self.errorMessage = "Error,Please try again";
                    }
                    );

            }

        }

       
        this.selectShowroom = function (index) {
            this.selectedShowroom = this.showrooms[index];
            this.lastSelected = this.showrooms[index]; 
            self.successMessage = undefined;
            self.errorMessage = undefined;
            self.addMessage = undefined;
        }

        this.toggleEditMode = function () {
            this.editMode = !this.editMode;
            this.addMode = false;
        }

        this.addShowroom = function () {
            this.addMode = true;
            this.selectedShowroom = {
                "id": new Date().toTimeString()
            };
            this.editMode = true;
            self.successMessage = undefined;
            self.errorMessage = undefined;
            self.addMessage = undefined;


        }
        this.deleteShowroom = function () {
            console.log("delete");
            var showroomData = this.selectedShowroom;
            ShowroomDataServiceSvc.deleteShowroom(showroomData)
                .then(function () {
                    self.loadData();
                    self.successMessage = "Deleted";
            
                },
                function () {
                    self.errorMessage = "Error,Please try again";
                }
                );

        }
        this.cancel = function(){
            self.toggleEditMode();
            self.selectedShowroom= self.showrooms[0];
            

        }

    }

})();


// app.value("AppnameSvc","Add showroom");

// function prepareAppConfig(AppnameSvc){
//     var value = {};
//     value.name = AppnameSvc;
//     value.author = "apotoxin";
//     value.builtDate = new Date().toDateString();

//     return value;
// }





// app.constant("AppDataSvc", prepareAppConfig);

// app.value("LoggingSvc", function () {
//     console.log("hello");
// });

//app.factory("AppDataFactorySvc", prepareAppConfig );




