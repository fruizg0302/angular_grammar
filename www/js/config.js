(function(){
	
	angular.module('starter.config', [])
	.constant('DB_CONFIG', {
	    name: 'DB',
	    tables: [
	      {
	            name: 'words',
	            columns: [
	                {name: 'id', type: 'integer primary key'},
	                {name: 'title', type: 'text'},
	                {name: 'description', type: 'text'}
	            ]},
	        {
	            name: 'mayus_exercises',
	            columns: [
	            {name: 'id', type: 'integer primary key'},
	            {name: 'frase', type: 'text'},
	            {name: 'validity', type:'integer'}
	            ]},
	         {
	         	name: 'scores',
	            columns: [
	                {name: 'id', type: 'integer primary key'},
	                {name: 'score', type: 'integer'}
	            ]
	        },
	        {
	        	name: 'status',
	            columns: [
	                {name: 'id', type: 'integer primary key'},
	                {name: 'tutorial', type: 'integer'},
	                {name:'exercises', type: 'integer'}
	            ]}

	]
	});
	
})();
