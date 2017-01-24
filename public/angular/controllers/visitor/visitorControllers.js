angular.module('app', [])
.controller('employees', function($scope, $http) {
    $http.get('http://localhost:3310/api/employees').
        then(function(response) {
            console.dir(response.data);
            $scope.employees = response.data;
        });
});