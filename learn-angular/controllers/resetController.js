angular.module('myApp').controller('resetController',['$state', '$scope', '$http', '$stateParams', function($state, $scope, $http, $stateParams) {
	$scope.submit = function() {
        var data = {
                token: $stateParams.id, email: $scope.email, password: $scope.password, password_confirmation: $scope.password_confirmation
            };
        $http.post('/api/password/reset/:id', data, undefined)
        .then(
           	function(response){
	           	if(response.status==201){           		
	           		 $state.transitionTo('login');
	           	}
	           	else{
	           		$scope.ResponseDetails1 = response.data;
	           	}
           	}, 
           	function(response){
             	$scope.ResponseDetails = response.data;
           	}
        ); 
    }
}]);