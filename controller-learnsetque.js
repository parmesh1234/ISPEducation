myApp.controller('LearnSetQue', ['$scope','$http','$interval',
	function($scope,$http,$interval){
    	$http.get('ques.json').success(function(data){
    		$scope.ques = data;
    	});
    	$scope.orderQue = 'setId';
    	$scope.interval = 0;
    	$interval(function() {
    	  	$scope.interval = ($scope.interval + 0.5) % 100;
    	}, 1000);
	}
]);

