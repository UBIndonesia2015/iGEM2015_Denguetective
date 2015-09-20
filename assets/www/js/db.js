var DB = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("DB_Dengue", "1.0", "Dengue DataBase", 5*1024*1024);
        this.db.transaction(
                function(tx) {
                  self.createTableRecord(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTableRecord = function(tx) {
        var sql = "CREATE TABLE IF NOT EXISTS 'record' ("
  				+ "'id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"
                + "'id_number' INTEGER NOT NULL,"
  				+ "'nama' TEXT NOT NULL,"
  				+ "'prov' TEXT NOT NULL,"
  				+ ");";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table record error: ' + error.message);
                });
    }
	
    this.addSampleData = function(tx, employees) {
       
        var sql = "INSERT INTO 'record' ('id', 'id_number', 'nama', 'prov') VALUES (1, '1251502011111040', 'Nyamuk', 'Jawa Timur');";
        tx.executeSql(sql, null,
			function() {
				console.log('INSERT success');
			},
			function(tx, error) {
				alert('INSERT error: ' + error.message);
			});
    }
	this.insert = function(tableName, data){
		var self = this;
		this.db.transaction(
            function(tx) {
				self.insertManual(tx, tableName, data);
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
	}
	this.insertManual = function(tx, tableName, data){
		var sql = "INSERT OR REPLACE INTO "+tableName+" (";
		for (var i = 0; i<data.length; i++){
			if (i>0){
				sql+=", ";
			}
			sql+=data[i].split("=>")[0];
		}
		sql+=") VALUES (";
		for (var i = 0; i<data.length; i++){
			if (i>0){
				sql+=", ";
			}
			sql+=data[i].split("=>")[1];
		}
		sql+=");";
		tx.executeSql(sql, null,
			function() {
				console.log('INSERT success');
			},
			function(tx, error) {
				alert('INSERT error: ' + error.message);
			});
	}
    this.initializeDatabase(successCallback, errorCallback);
}