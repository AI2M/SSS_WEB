/**
 * Created by Asma on 11/03/16.
 */
(function () {
    'use strict';
    var myApp = angular.module('SSS');
    myApp.service('fileUploadService', function ($http, $q) {

        this.uploadFileToUrl = function (file,newfilename,uploadUrl) {
            var fileFormData = new FormData();
            fileFormData.append('file', file, newfilename);
            console.log(fileFormData);
            var deffered = $q.defer();
            $http.post(uploadUrl, fileFormData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            }).then(function (response) {
                deffered.resolve(response);
                console.log(response);

            }),(function (response) {
                deffered.reject(response);
                console.log(response);
            });

            return deffered.promise;
        }
    });
})();