var app = angular.module("MonitorApp", []);

app.controller("MonitorCtrl", function($scope, $http) {

	var getJson = function() {
		$http.get('http://gnu.fon.bg.ac.rs/qfon/api/sluzba/monitor').success(function(data, status, headers, config) {
			$scope.odgovor = data;
			$scope.pomocni1 = "";
			$scope.pomocni2 = "";
			$scope.pomocni3 = "";
			for(var i = 0; i<$scope.odgovor.pomocniRedovi[0].pomocniRed.length;i++){
				if(i==($scope.odgovor.pomocniRedovi[0].pomocniRed.length-1)){
					$scope.pomocni1 += $scope.odgovor.pomocniRedovi[0].pomocniRed[i].index;
				} else{
					$scope.pomocni1 += $scope.odgovor.pomocniRedovi[0].pomocniRed[i].index+",  ";
				}
			};
			for(var i = 0; i<$scope.odgovor.pomocniRedovi[1].pomocniRed.length;i++){
				if(i==($scope.odgovor.pomocniRedovi[1].pomocniRed.length-1)){
					$scope.pomocni2 += $scope.odgovor.pomocniRedovi[1].pomocniRed[i].index;
				} else{
					$scope.pomocni2 += $scope.odgovor.pomocniRedovi[1].pomocniRed[i].index+",  ";
				}
			};
			for(var i = 0; i<$scope.odgovor.pomocniRedovi[2].pomocniRed.length;i++){
				if(i==($scope.odgovor.pomocniRedovi[2].pomocniRed.length-1)){
					$scope.pomocni3 += $scope.odgovor.pomocniRedovi[2].pomocniRed[i].index;
				} else{
					$scope.pomocni3 += $scope.odgovor.pomocniRedovi[2].pomocniRed[i].index+",  ";
				}
			};
		}).error(function(data, status, headers, config) {
			//alert("greska");
		});
	}

	$scope.klik = setInterval(getJson,2000);
});