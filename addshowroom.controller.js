var app = angular.module("AddshowroomApp", []);

(function () {
    var app = angular.module("AddshowroomApp");
    app.controller("AddshowroomCtrl", AddshowroomCtrl);

    function AddshowroomCtrl(MusicBoxDataServiceSvc) {
        var self = this;
        self.editMode = false;
        self.addMode = false;

        this.loadData = function(){
            MusicBoxDataServiceSvc.getMusicbox()
            .then(function (data) {
                self.musicboxs = null;
                self.musicboxs = data;
                self.selectedMusicBox = self.musicboxs[0];
                

            });
        }      
        self.loadData();

        this.saveMusic = function () {
            self.successMessage = undefined;
            self.errorMessage = undefined;
            self.addMessage = undefined;
            this.editMode = !this.editMode;
            var musicboxData = this.selectedMusicBox;
            if (self.addMode) {
                MusicBoxDataServiceSvc.createMusic(musicboxData)
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
                MusicBoxDataServiceSvc.saveMusic(musicboxData)
                    .then(function () {
                        self.successMessage = "Succesfully updated";
                    },
                    function () {
                        self.errorMessage = "Error,Please try again";
                    }
                    );

            }

        }

       
        this.selectMusicBox = function (index) {
            this.selectedMusicBox = this.musicboxs[index];
            this.lastSelected = this.musicboxs[index]; 
            self.successMessage = undefined;
            self.errorMessage = undefined;
            self.addMessage = undefined;
        }

        this.toggleEditMode = function () {
            this.editMode = !this.editMode;
            self.addMode = false;
        }

        this.addMusicbox = function () {
            self.addMode = true;
            this.selectedMusicBox = {
                "id": new Date().toTimeString()
            };
            this.editMode = true;


        }
        this.deleteMusicBox = function () {
            console.log("delete");
            var musicboxData = this.selectedMusicBox;
            MusicBoxDataServiceSvc.deleteMusic(musicboxData)
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
            self.selectedMusicBox = self.musicboxs[0];
            

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




