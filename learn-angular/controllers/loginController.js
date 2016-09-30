angular.module('myApp').controller('loginController',['$scope', '$http', '$stateParams','$location', '$rootScope', function($scope, $http, $stateParams, $location, $rootScope) {
    $scope.confirm = $stateParams.confMessage;
    $scope.submit = function() {
        var data = {
                    remember: $scope.remember, email: $scope.email, password:$scope.password
                };
            $http.post('/api/login', data, undefined)
            .then(
                function(response){
                  localStorage.setItem('email', response.data.email);
                  localStorage.setItem('name', response.data.name);
                  $rootScope.loggedIn = true;
                  $location.path('/home');
                }, 
                function(response){
                  $scope.ResponseDetails = response.data;
                }
            ); 
        }
  	$scope.logout = function() {
        localStorage.clear();
        $rootScope.loggedIn = false;
    };
    $scope.checkStorage = function ()
	  {
	   return localStorage.getItem('email') !== null;
    };
    $scope.checkStorage1 = function ()
    {
     return $scope.ResponseDetails = localStorage.getItem('name');
    };
    $scope.isCurrentPath = function (path) {
      $scope.postdetails = '/posts/'+$stateParams.id;
      $scope.postedit = '/posts/'+$stateParams.id+'/edit';
      $scope.addnewpost = '/posts/create';
      return $location.path() == path;
    };
}]);