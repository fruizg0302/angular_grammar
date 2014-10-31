(function(){
	
	angular.module('starter.controllers', ['starter.services', 'restangular']).config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl("http://localhost:3000");
  RestangularProvider.setResponseExtractor(function(response, operation) {
	  var newResponse = response;
	    if (angular.isArray(response)) {
	      angular.forEach(newResponse, function(value, key) {
	        newResponse[key].originalElement = angular.copy(value);
			//newResponse.originalElement[key] = angular.copy(value);
	      });
	    } else {
	      newResponse.originalElement = angular.copy(response);
	    }

	    return newResponse;
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('intro', {
    url: '/',
    templateUrl: 'partial-main.html'
	
  })
  .state('about', {
    url: '/about',
    templateUrl: 'partial-about.html'
    
  })
  
  .state('tutorial', {
    url: '/tutorial',
    templateUrl: 'partial-intro.html'
    
  })
  
  .state('letras', {
    url: '/letras',
    templateUrl: 'partial-letras.html'
    
  })
  
  .state('silabas', {
      url: '/silabas',
      templateUrl: 'partial-silabas.html'
    
    });

  $urlRouterProvider.otherwise("/");

})


	.controller('JsonConsumerController', function($scope, $http){
		$http.get('http://rest-service.guides.spring.io/greeting').
			success(function(data){
				$scope.greeting = data;
			});
			console.log("Obteniendo información");
	})	

	.controller('ContentController', function($scope, $ionicSideMenuDelegate){
		$scope.toggleLeft=function(){
			$ionicSideMenuDelegate.toggleLeft();	
		};
	
	})

	.controller('HelloCtrl', function($scope){
	  $scope.name="Te queremos lejos";
	  
	})
	
	.controller('ShoppingController',function($scope, Items){
	$scope.items= Items.query();	
	})
	
	.controller('WordsController',function($scope, Words){
    $scope.words = [];
	Words.initDatabase();
    Words.all().then(function(docs){
           $scope.words = docs;
       });
	 })

	.controller('MayusExercisesController',function($scope, Mayus, $ionicPopup){
    $scope.mayus = [];
    Mayus.getMayusExercises().then(function(docs){
           $scope.mayus = docs;    
       });

    $scope.showAlert = function(thisTitle, thisTemplate) {
     var alertPopup = $ionicPopup.alert({
       title: thisTitle,
       template: thisTemplate
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };

    $scope.compareSelection = function(i, u) { 
    		index = i - 1;
    		if(($scope.mayus[index].validity === u)){
    			
    			$scope.showAlert('Muy bien', 'Acertaste');
    		}
    		else{
    			$scope.showAlert('Oops', 'Erraste amigo');
    		}
  };


 

	 })


	
	 .controller('RestangularConsumerController', function($scope, Restangular, Words) {
		 
		 var baseResource = Restangular.one("palabras");
		 baseResource.get().then(function(greet){
		 		$scope.greetings = greet;
				Words.insertRecord($scope.greetings[0].id, $scope.greetings[1].title, $scope.greetings[2].description);
				
		        
		 	});
			
	 })
	 
	 

.controller('ModalController', function($scope, $ionicModal) {
  
  $ionicModal.fromTemplateUrl('modal-ejercicios-mayusculas.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.createContact = function(u) {        
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

})

.directive('fakeStatusbar', function() {
	   return {
	     restrict: 'E',
	     replace: true,
	     template: '<div class="fake-statusbar"><div class="pull-left">Carrier</div><div class="time">3:30 PM</div><div class="pull-right">50%</div></div>'
	   }
	 })
	 
	 
.directive('headerShrink', function($document) {
	   var fadeAmt;

	   var shrink = function(header, content, amt, max) {
	     amt = Math.min(44, amt);
	     fadeAmt = 1 - amt / 44;
	     ionic.requestAnimationFrame(function() {
	       header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
	       for(var i = 0, j = header.children.length; i < j; i++) {
	         header.children[i].style.opacity = fadeAmt;
	       }
	     });
	   };

	   return {
	     restrict: 'A',
	     link: function($scope, $element, $attr) {
	       var starty = $scope.$eval($attr.headerShrink) || 0;
	       var shrinkAmt;
      
	       var header = $document[0].body.querySelector('.bar-header');
	       var headerHeight = header.offsetHeight;
      
	       $element.bind('scroll', function(e) {
	         if(e.detail.scrollTop > starty) {
	           // Start shrinking
	           shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - e.detail.scrollTop);
	           shrink(header, $element[0], shrinkAmt, headerHeight);
	         } else {
	           shrink(header, $element[0], 0, headerHeight);
	         }
	       });
	     }
	   }
	 });	
})();

