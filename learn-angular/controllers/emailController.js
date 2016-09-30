angular.module('myApp').controller('emailController',['$scope', '$http', function($scope, $http) {
	$scope.submit = function() {
        var data = {
                email: $scope.email
            };
        $http.post('/api/password/reset', data, undefined)
        .then(
           function(response){
           			$scope.ResponseDetails = response.data;           		
           }, 
           function(response){
             	$scope.ResponseDetails = response.data;
           }
        ); 
    }
}]);