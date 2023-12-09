function onEdit(e) {
  //Range that was edited- Parameter as 'e'
  var editedRange = e.range;
  //Get the sheet name
  var sheetName = editedRange.getSheet().getName();
  //Check the edit done in the sheet1. If yes, column E will be checked.
  if (sheetName === "Sheet1" && editedRange.getColumn() === 5) {
//Row and value was taken in the specific column
    var editedRow = editedRange.getRow();
    var editedValue = editedRange.getValue();
//Create current date and time.
    var timestamp = new Date();
//EditedValue cell is not blank then update the date and time in the row 15    
    if (editedValue !== "") {
      editedRange.getSheet().getRange(editedRow, 15).setValue(timestamp); 
//Else clear the row 15 of that column
    } else {
      editedRange.getSheet().getRange(editedRow, 15).clearContent(); 
    } 
  }
}
