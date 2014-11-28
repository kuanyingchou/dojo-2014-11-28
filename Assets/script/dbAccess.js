/*  Javascript class for accessing SQLite objects.  
     To use it, you need to make sure you COPY Mono.Data.SQLiteClient.dll from wherever it lives in your Unity directory
     to your project's Assets folder
     Originally created by dklompmaker in 2009
     http://forum.unity3d.com/threads/28500-SQLite-Class-Easier-Database-Stuff    
     Modified 2011 by Alan Chatham           */
import          System.Data;  // we import our  data class
import          Mono.Data.Sqlite; // we import sqlite
 
class dbAccess {
    // variables for basic query access
    private var connection : String;
    private var dbcon : IDbConnection;
    private var dbcmd : IDbCommand;
    private var reader : IDataReader;
    
    function OpenDB(p : String){
    connection = "URI=file:Assets/Resources" + p; // we set the connection to our database
    dbcon = new SqliteConnection(connection);
    dbcon.Open();
    }
    
    function BasicQuery(q : String, r : boolean){ // run a baic Sqlite query
        dbcmd = dbcon.CreateCommand(); // create empty command
        dbcmd.CommandText = q; // fill the command
        reader = dbcmd.ExecuteReader(); // execute command which returns a reader
        if(r){ // if we want to return the reader
        return reader; // return the reader
        }
    }
    
    // This returns a 2 dimensional ArrayList with all the
    //  data from the table requested
    function ReadFullTable(tableName : String){
        var query : String;
        query = "SELECT * FROM " + tableName;   
        dbcmd = dbcon.CreateCommand();
        dbcmd.CommandText = query; 
        reader = dbcmd.ExecuteReader();
        var readArray = new ArrayList();
        while(reader.Read()){ 
            var lineArray = new ArrayList();
            for (var i = 0; i < reader.FieldCount; i++)
                lineArray.Add(reader.GetValue(i)); // This reads the entries in a row
            readArray.Add(lineArray); // This makes an array of all the rows
        }
        return readArray; // return matches
    }
    
    // This function deletes all the data in the given table.  Forever.  WATCH OUT! Use sparingly, if at all
    function DeleteTableContents(tableName : String){
    var query : String;
    query = "DELETE FROM " + tableName;
    dbcmd = dbcon.CreateCommand();
    dbcmd.CommandText = query; 
    reader = dbcmd.ExecuteReader();
    }
    
    function CreateTable(name : String, col : Array, colType : Array){ // Create a table, name, column array, column type array
        var query : String;
        query  = "CREATE TABLE " + name + "(" + col[0] + " " + colType[0];
        for(var i=1; i<col.length; i++){
            query += ", " + col[i] + " " + colType[i];
        }
        query += ")";
        dbcmd = dbcon.CreateCommand(); // create empty command
        dbcmd.CommandText = query; // fill the command
        reader = dbcmd.ExecuteReader(); // execute command which returns a reader
    
    }
    
    function InsertIntoSingle(tableName : String, colName : String, value : String){ // single insert 
        var query : String;
        query = "INSERT INTO " + tableName + "(" + colName + ") " + "VALUES (" + value + ")";
        dbcmd = dbcon.CreateCommand(); // create empty command
        dbcmd.CommandText = query; // fill the command
        reader = dbcmd.ExecuteReader(); // execute command which returns a reader
    }
    
    function InsertIntoSpecific(tableName : String, col : Array, values : Array){ // Specific insert with col and values
        var query : String;
        query = "INSERT INTO " + tableName + "(" + col[0];
        for(var i=1; i<col.length; i++){
            query += ", " + col[i];
        }
        query += ") VALUES (" + values[0];
        for(i=1; i<values.length; i++){
            query += ", " + values[i];
        }
        query += ")";
        dbcmd = dbcon.CreateCommand();
        dbcmd.CommandText = query; 
        reader = dbcmd.ExecuteReader();
    }
    
    function InsertInto(tableName : String, values : Array){ // basic Insert with just values
        var query : String;
        query = "INSERT INTO " + tableName + " VALUES (" + values[0];
        for(var i=1; i<values.length; i++){
            query += ", " + values[i];
        }
        query += ")";
        dbcmd = dbcon.CreateCommand();
        dbcmd.CommandText = query; 
        reader = dbcmd.ExecuteReader(); 
    }
    
    // This function reads a single column
    //  wCol is the WHERE column, wPar is the operator you want to use to compare with, 
    //  and wValue is the value you want to compare against.
    //  Ex. - SingleSelectWhere("puppies", "breed", "earType", "=", "floppy")
    //  returns an array of matches from the command: SELECT breed FROM puppies WHERE earType = floppy;
    function SingleSelectWhere(tableName : String, itemToSelect : String, wCol : String, wPar : String, wValue : String){ // Selects a single Item
        var query : String;
        query = "SELECT " + itemToSelect + " FROM " + tableName + " WHERE " + wCol + wPar + wValue; 
        dbcmd = dbcon.CreateCommand();
        dbcmd.CommandText = query; 
        reader = dbcmd.ExecuteReader();
        var readArray = new Array();
        while(reader.Read()){ 
            readArray.Push(reader.GetString(0)); // Fill array with all matches
        }
        return readArray; // return matches
    }

    
    function CloseDB(){
        reader.Close(); // clean everything up
        reader = null; 
        dbcmd.Dispose(); 
        dbcmd = null; 
        dbcon.Close(); 
        dbcon = null; 
    }
    
}