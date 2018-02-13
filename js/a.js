angular.module('SSS', ['datatables']).controller('WithAjaxCtrl', WithAjaxCtrl);

function WithAjaxCtrl(DTOptionsBuilder, DTColumnBuilder,$http, $q, $interval, $compile ,$scope) {
    var vm = this;
    vm.dtInstance = {};
    vm.newPromise = newPromise;
    vm.reloadData = reloadData;
    vm.newPromise = newPromise;
    

    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
        var defer = $q.defer();
        // var data = {'url' : 'http://139.59.251.210/api-prevent/ajax/getallrounds'};
        // $http.get('http://l-lin.github.io/angular-datatables/archives/data.json')

        $http({
			method : 'GET',
			url : 'http://localhost/SSS_web_api/getShowroomData.php',
			headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json'
		 	},
			// data: data,
		})
		.then(function(result) {
			// console.log(result.data);
			var datain = angular.fromJson(result.data.showrooms);
			// // console.log(datain);
            defer.resolve(datain);
            // defer.resolve(result.data);
        });
        return defer.promise;
    })
    // vm.dtOptions = DTOptionsBuilder.fromSource('http://l-lin.github.io/angular-datatables/archives/data.json')
        .withPaginationType('full')
        // Active Responsive plugin
        .withOption('responsive', true);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('showroom_id').withTitle('Showroom ID'),
        DTColumnBuilder.newColumn('location').withTitle('Location'),        
        DTColumnBuilder.newColumn('region').notSortable().withTitle('Region'),
        DTColumnBuilder.newColumn('password').notSortable().withTitle('Password'),
        DTColumnBuilder.newColumn('detail').notSortable().withTitle('Detail'),
    ];

    // $interval(function() {
    // 	vm.dtInstance.changeData(vm.newPromise());
    // }, 300000);

    function newPromise() {
    	var defer = $q.defer();
        // var data = {'url' : 'admindash/currentcon'};
        // $http.get('http://l-lin.github.io/angular-datatables/archives/data.json')

        $http({
			method : 'GET',
			url : 'http://localhost/SSS_web_api/getShowroomData.php',
			headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json'
		 	},
			// data: data,
		})
		.then(function(result) {
			// console.log(result.data);
			var datain = angular.fromJson(result.data.showrooms);
            defer.resolve(datain);
            // defer.resolve(result.data);
        });
        return defer.promise;
    }

    function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
    }

    function callback(json) {
        console.log(json);
    }
}