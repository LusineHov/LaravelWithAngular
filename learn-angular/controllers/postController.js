angular.module('myApp').controller('postController',['$scope', '$state', '$log', '$http', '$stateParams','$location', 'Upload', '$timeout', '$rootScope', function($scope, $state, $log, $http, $stateParams, $location, Upload, $timeout, $rootScope) {
	//show all posts
    if($location.path()=='/posts'){
        $http.get('/api/posts').then(function(response){
    		$scope.posts = response.data.posts;
    	})  
    }

    //create new post
    else if($location.path()=='/posts/create'){
        $http.get('/api/posts/create').then(function(response){
            $scope.categories = response.data.categories;
            console.log(response.data.categories) ;
            $scope.categoryname = response.data.categories[0].name;           
        })
        
        $scope.uploadPic = function(file) {
            if(file){

                file.upload = Upload.upload({
                  url: '/api/posts',
                  data: {title: $scope.title, image: file, category_id: $scope.categoryname, content: $scope.content},
                });

                file.upload.then(function (response) {
                  $timeout(function () {
                    file.result = response.data;
                    $state.go('posts');
                  });
                }, function (response) {
                    $scope.ResponseDetails = response.data;  
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

            }
            else{

                var data = {
                        title: $scope.title, category_id: $scope.categoryname, content: $scope.content
                    };
                $http.post('/api/posts', data, undefined)
                .then(
                   function(response){
                        $state.go('posts');
                   }, 
                   function(response){
                        $scope.ResponseDetails = response.data;
                   }
                ); 

            }
        }
       
    }

    //show a single post
    else if($location.path()=='/posts/'+$stateParams.id){
        $scope.error = $stateParams.errorMessage;
        $http.get('/api/posts/'+$stateParams.id).then(function(response){
            $scope.post = response.data.post;
            $scope.categoryname = response.data.categoryname;
            $scope.username = response.data.username;
            $rootScope.authuser = response.data.authuser;
            $rootScope.postuser = response.data.post.user_id;
        }) 
        $http.get('/api/posts/'+$stateParams.id+'/edit').then(function(response){
            $scope.error1 = response.data.message;
        })
    }

    //edit post
    else if($location.path()=='/posts/'+$stateParams.id+'/edit'){

        $http.get('/api/posts/'+$stateParams.id+'/edit').then(function(response){
    		$scope.post = response.data.post;
    		$scope.categories = response.data.categories;
            $scope.categoryname = response.data.categoryname;
    		$scope.error = response.data.message;
            if($scope.error){
                $state.transitionTo('postdetails', {id: $stateParams.id, errorMessage: response.data.message});
            }
        })
        $scope.uploadPic = function(file) {
            if(file){

                file.upload = Upload.upload({
                  url: '/api/posts/'+$stateParams.id,
                  data: {_method: 'PUT', title: $scope.post.title, image: file, hidden_image: $scope.hidden_image, category_id: $scope.categoryname, content: $scope.post.content},
                });

                file.upload.then(function (response) {
                  $timeout(function () {
                    file.result = response.data;
                    $state.transitionTo('postdetails', {id: $stateParams.id});
                  });
                }, function (response) {
                    $scope.ResponseDetails = response.data;                
                }, function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

            }

            else{

                var data = {
                        _method: 'PUT',  title: $scope.post.title, hidden_image: $scope.hidden_image, category_id: $scope.categoryname, content: $scope.post.content
                    };
                $http.post('/api/posts/'+$stateParams.id, data, undefined)
               .then(
                   function(response){
                        $state.transitionTo('postdetails', {id: $stateParams.id});
                   }, 
                   function(response){
                        $scope.ResponseDetails = response.data;
                   }
                );

            }
        }
    }
}]);