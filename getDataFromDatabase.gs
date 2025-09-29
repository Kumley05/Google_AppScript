var Database_Host = "10.10.0.33";
var Database_Name = "CDR";
var Database_username = "naveenkumar";
var Database_password = "naVEen_2025";
var Port_number = "61306";

function getDataFromDatabase() {
  var url = 'jdbc:mysql://' + Database_Host + ':' + Port_number + '/' + Database_Name;
  var conn = Jdbc.getConnection(url, Database_username, Database_password);
  var stmt = conn.createStatement();
  var results = stmt.executeQuery('SELECT * FROM your_table');
  var metaData = results.getMetaData();
  var numCols = metaData.getColumnCount();
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Overall");
  if (!sheet) {
    throw new Error('Sheet named "Overall" not found');
  }
  sheet.clear(); // clear existing content in "Overall" sheet
  
  // Set column headers
  for (var col = 0; col < numCols; col++) {
    sheet.getRange(1, col + 1).setValue(metaData.getColumnName(col + 1));
  }
  
  // Set row data
  var row = 2;
  while (results.next()) {
    for (var col = 0; col < numCols; col++) {
      sheet.getRange(row, col + 1).setValue(results.getString(col + 1));
    }
    row++;
  }
  
  results.close();
  stmt.close();
  conn.close();
}
