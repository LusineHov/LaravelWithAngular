angular.module('myApp').controller('settingsController',['$scope', '$state', '$rootScope', '$http', function($scope, $state, $rootScope, $http) {
	
	$http.get('/api/settings').then(function(response){
		$scope.settings = response.data.user;
	})
	
	$scope.delete = function(){

		$http.delete('/api/settings', undefined)
	   .then(
	       function(response){
	        	$scope.msg = response.data.message;
	        	$state.transitionTo('login', {confMessage: response.data.message});
	        	localStorage.removeItem("email");
	        	localStorage.removeItem("name");
        		$rootScope.loggedIn = false;
	       }, 
	       function(response){
	         // failure call back
	       }
	    );
	}
	$scope.edit = function(){
		var data = {
            	_method: 'PATCH', name: $scope.name, email: $scope.email, password: $scope.password, old_password: $scope.old_password, password_confirmation: $scope.password_confirmation
            };
		$http.post('/api/settings', data, undefined)
	    .then(
	        function(response){
		       	if(response.status==201){
		       		//console.log($scope.name);
		       		localStorage.setItem('name', $scope.name);
		       		//console.log(localStorage);
		         	$state.transitionTo('settings');
		       	}else{
		         	$scope.ResponseDetails = response.data;
		       	}
	        }, 
	        function(response){
	            $scope.ResponseDetails = response.data; 
	        }
	    );
	}
}]);