// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
	
	angular.module('starter', ['ionic','starter.services', 'starter.controllers', 'restangular'])
	.run(function($ionicPlatform, DB) {	  	
	  $ionicPlatform.ready(function() {		
	    if(window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    }
	    if(window.StatusBar) {
	      StatusBar.styleDefault();
	    }
	  });
	  DB.init();
	})
})();






