var myApp = angular.module('myApp',[
		'ngRoute',
		'timer',
		'ui.bootstrap'
	]);
myApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/home',{
				templateUrl: 'learn-home.html',
				controller: 'LearnHome'
			}).
			when('/home/login',{
				templateUrl: 'learn-login.html',
				controller: 'LearnLogIn'
			}).
			when('/home/SignUp',{
				templateUrl: 'learn-signup.html',
				controller: 'LearnSignUp'
			}).
			when('/home/Reports',{
				templateUrl: 'learn-reports.html',
				controller: 'LearnReports'
			}).
			when('/home/AboutUs',{
				templateUrl: 'learn-aboutus.html',
				controller: 'LearnAboutUs'
			}).
			when('/home/SampleTest',{
				templateUrl: 'learn-sampletests.html',
				controller: 'LearnSampleTest'
			}).
			when('/home/SampleTest/4',{
				templateUrl: 'learn-sampletest4.html',
				controller: 'LearnSampleTest4'
			}).
			when('/home/SampleTest/4/q1',{
				templateUrl: 'learn-que1.html',
				controller: 'LearnSetQue'
			}).
			when('/home/dashboard',{
				templateUrl: 'learn-dashboard.html',
				controller: 'LearnDashBoard'
			}).
			when('/home/login/forgotpassword',{
				templateUrl: 'learn-forpasswd.html',
				controller: 'LearnForgotPassword'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}]);

myApp.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'templete.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.explain = q.explain;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

myApp.factory('quizFactory', function($http) {
	var questions = [];

   $http.get('ques.json').success(function(data) {
     questions = data;

 });
	
	
	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});