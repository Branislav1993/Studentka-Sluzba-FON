var app = angular.module('app', []);

var global = 'http://gnu.fon.bg.ac.rs/qfon/api';

app.controller("studCtrl", function($scope, $http){

	var funkcija = function(){
		$http.get(global + '/student/stanje').success(function(data) {
			$scope.stanje = data.stanje;
		}).error(function(data, status) {
			alert('Došlo je do greške! Molimo Vas pokušajte opet.');
		});
	};

	funkcija();

	$scope.prijaviSe = function(imeForme) {
		if(imeForme){

			$scope.ind = document.getElementById('indeks').value;
			var sal = document.getElementById('salter').value;

			var url = global + '/student/stani?salter='+ sal + '&index=' + $scope.ind;

			

			$http.get(url).success(function(data) {
				$scope.stanje = data.stanje;
				$scope.odgovor = data.odgovor;
				var brojStudent = data.odgovor.brojStudent;

				if (data.stanje[sal-1].tekuciBroj == 'ZATVORENO') {
					$scope.porukaGreskeUspeha1 = "Odabrani šalter je zatvoren!";					
				}
				if (brojStudent == 'POSTOJI' && data.stanje[sal-1].tekuciBroj != 'ZATVORENO') {
					$scope.porukaGreskeUspeha1 = "Student sa brojem indeksa " + $scope.ind + " se već nalazi na šalteru broj " + sal + ".";
				} else if(data.stanje[sal-1].tekuciBroj != 'ZATVORENO') {
					$scope.porukaGreskeUspeha1 = "Uspešno! Vaš redni broj na šalteru broj " + sal + " je " + data.odgovor.brojStudent + ".";	
				}

			}).error(function(data, status) {
				alert('Došlo je do greške! Molimo Vas pokušajte opet.');
			});

			
		} else{
			$scope.porukaGreskeUspeha1 = "Indeks nije u odgovarajućem formatu. Primer: 1234/2014";
		}		
	}

	$scope.proveriIndeks = function(imeForme) {
		if(imeForme){
			$scope.porukaGreskeUspeha2 = "";
			$scope.ind2 = document.getElementById('indeks2').value;
			var url = global + '/student/proveri?index=' + $scope.ind2;

			$http.get(url).success(function(data) {
				$scope.stanje = data.stanje;
				$scope.provereno = data.provera;
			}).error(function(data, status) {
				alert('Došlo je do greške! Molimo Vas pokušajte opet.');
			});
		} else {
			$scope.porukaGreskeUspeha2 = "Indeks nije u odgovarajućem formatu. Primer: 1234/2014";
		}		
	}
	
});