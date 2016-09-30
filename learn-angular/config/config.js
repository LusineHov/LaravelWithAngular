// angular.module('myApp').config(function ($routeProvider, $locationProvider){
// 	$routeProvider
// 	.when('/',{
// 		templateUrl: 'pages/index.html',
// 		controller: 'indexController'
// 	})
// 	.when('/login',{
// 		templateUrl: 'pages/login.html',
// 		controller: 'loginController'
// 	})
// 	.when('/register',{
// 		templateUrl: 'pages/register.html',
// 		controller: 'registerController'
// 	})
// 	.when('/password/reset',{
// 		templateUrl: 'pages/email.html',
// 		controller: 'emailController'
// 	})
// 	.when('/password/reset/:id',{
// 		templateUrl: 'pages/reset.html',
// 		controller: 'resetController'
// 	})
// 	.when('/home',{
// 		resolve: {
// 			'check': check
// 		},
// 		templateUrl: 'pages/home.html',
// 		controller: 'homeController'
// 	})
// 	.when('/about',{
// 		resolve: {
// 			'check': check
// 		},
// 		templateUrl: 'pages/about.html',
// 		controller: 'aboutController'
// 	})
// 	.when('/posts',{
// 		resolve: {
// 			'check': check
// 		},
// 		templateUrl: 'pages/posts.html',
// 		controller: 'postController'
// 	})
// 	.when('/posts/create',{
// 		resolve: {
// 			'check': check
// 		},
// 		templateUrl: 'pages/create.html',
// 		controller: 'postController'
// 	})
// 	.when('/posts/:id',{
// 		resolve: {
// 			'check': check
// 		},
// 		templateUrl: 'pages/show.html',
// 		controller: 'postController'
// 	})
// 	.when('/posts/:id/edit',{
// 		resolve: {
// 			'check': check
// 		},
// 		templateUrl: 'pages/edit.html',
// 		controller: 'postController'
// 	})
// 	.when('/settings',{
// 		resolve: {
// 			'check': check
// 		},
// 		templateUrl: 'pages/settings.html',
// 		controller: 'settingsController'
// 	})
// 	.when('/settings/edit',{
// 		resolve: {
// 			'check': check
// 		},
// 		templateUrl: 'pages/settingsedit.html',
// 		controller: 'settingsController'
// 	})
// 	.otherwise({
// 		redirectTo: '/'
// 	})
// });

//added from here
angular.module('myApp').config(function ($stateProvider, $locationProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('main',{
		url: '/',
		templateUrl: 'pages/index.html',
		controller: 'indexController'
	})
	.state('login',{
		url: '/login',
		params: {
			confMessage: null
		},
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.state('register',{
		url: '/register',
		templateUrl: 'pages/register.html',
		controller: 'registerController'
	})
	.state('passwordreset',{
		url: '/password/reset',
		templateUrl: 'pages/email.html',
		controller: 'emailController'
	})
	.state('passwordresetform',{
		url: '/password/reset/:id',
		templateUrl: 'pages/reset.html',
		controller: 'resetController'
	})
	.state('home',{
		url: '/home',
		resolve: {
			'check': check
		},
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
	.state('about',{
		url: '/about',
		resolve: {
			'check': check
		},
		templateUrl: 'pages/about.html',
		controller: 'aboutController'
	})
	.state('posts',{
		url: '/posts',
		resolve: {
			'check': check
		},
		templateUrl: 'pages/posts.html',
		controller: 'postController'
	})
	.state('createpost',{
		url: '/posts/create',
		resolve: {
			'check': check
		},
		templateUrl: 'pages/create.html',
		controller: 'postController'
	})
	.state('postdetails',{
		url: '/posts/:id',
		resolve: {
			'check': check
		},
		params: {
			errorMessage: null
		},
		templateUrl: 'pages/show.html',
		controller: 'postController'
	})
	.state('postedit',{
		url: '/posts/:id/edit',
		resolve: {
			'check': check
		},
		templateUrl: 'pages/edit.html',
		controller: 'postController'
	})
	.state('settings',{
		url: '/settings',
		resolve: {
			'check': check
		},
		templateUrl: 'pages/settings.html',
		controller: 'settingsController'
	})
	.state('settingsedit',{
		url: '/settings/edit',
		resolve: {
			'check': check
		},
		templateUrl: 'pages/settingsedit.html',
		controller: 'settingsController'
	})
});
// to here

function check($location, $rootScope){
	if(!$rootScope.loggedIn && localStorage.getItem('email') === null){
		$location.path('/login');
	}
}