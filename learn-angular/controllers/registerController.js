angular.module('myApp').controller('registerController',['$http', '$scope', '$location', function($http, $scope, $location) {
	$scope.submit = function() {
        var data = {
                name: $scope.name, email: $scope.email, password:$scope.password, password_confirmation:$scope.password_confirmation
            };
        $http.post('/api/register', data, undefined)
        .then(
           function(response){           	
              $location.path('/login');
           }, 
           function(response){
              $scope.ResponseDetails = response.data;
           }
        ); 
    }
}]);