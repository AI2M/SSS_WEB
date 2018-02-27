angular.module('ngAppDemo', ['ultimateDataTableServices']).controller('ngAppDemoController', ['$scope','datatable',function($scope,datatable) {

    //Simple example of configuration
        var datatableConfig = {
            "name":"simple_datatable",
            "columns":[
                {
                    "header":"test",
                    "property":"test",
                    "order":true,
                    "type":"text",
                    "edit":true
                },
                {
                    "header":"test2",
                    "property":"test2",
                    "order":true,
                    "type":"text"
                }
            ],
            "edit":{
                "active":true,
                "columnMode":true
            },
            "pagination":{
                "mode":'local'
            },
            "order":{
                "mode":'local'
            },
            "remove":{
                "active":true,
                "mode":'local'
            }
        };

        //Simple exemple of data
        var datatableData = [{"test":1, "test2":1000},{"test":1, "test2":1000},{"test":1, "test2":1000},
        {"test":1, "test2":1000},{"test":1, "test2":1000},{"test":1, "test2":1000},
        {"test":1, "test2":1000}];

        //Init the datatable with his configuration
        $scope.datatable = datatable(datatableConfig);
        //Set the data to the datatable
        $scope.datatable.setData(datatableData);
}]);