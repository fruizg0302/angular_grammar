(function(){
	
	angular.module('starter.services', ['starter.config'])
// DB wrapper
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;
 
    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', 2048);
 
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
 
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
 
            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };
 
    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };
 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        return result.rows.item(0);
    };
 
    return self;
})
// Resource service for word from database
.factory('Words', function(DB) {
    
	var self = this;
	
	self.insertRecord = function(id, title, description){
		console.log(id);
		console.log(title);
		console.log(description);
		console.log("Insertando registro");
		DB.query('INSERT INTO WORDS (id, title, description) VALUES(' + id + ' ,' + '\"' + title + '\"' +' ,' + '\"' + description + '\"' + ')');
	};
	
	self.initDatabase = function(){
		console.log("Insertion going on");
		DB.query('INSERT INTO WORDS (id, title, description) VALUES (1, "Abúlico", "Que padece abulia, que no tiene voluntad o energía:")');
        DB.query('INSERT INTO mayus_exercises (id, frase, validity) VALUES(1, "!Que hermoso!, Dijo Elena", 0)');
        DB.query('INSERT INTO mayus_exercises (id, frase, validity) VALUES(2, "¿En serio?, eso es genial", 1)');
	};
    
    self.all = function() {
        return DB.query('SELECT * FROM Words')
        .then(function(result){
            return DB.fetchAll(result);
        });
		console.log("fetching all records");
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM Words WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    
    
    return self;
})


.factory('Mayus', function(DB) {
    
    var self = this;
    self.getMayusExercises = function() {
        return DB.query('SELECT * FROM mayus_exercises')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    return self;
})

.factory('Items', function() {
  var items = {};
  items.query = function() {
    return [
      {title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
      {title: 'Polka dots', description: 'Dots with polka', price: 2.95},
      {title: 'Pebbles', description: 'Just little rocks', price: 6.95}
    ];
  };
  return items;
});


	
	
})();

