function FromSheetNameToTransfer() {
//Get active Spreadsheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet ();
//Refer to the sheet name
  var sourceSheet = ss.getSheetByName("FromSheetName");
//Update the range and extend upto last row.
  var source = sourceSheet.getRange("A2:O" + sourceSheet.getLastRow());
//Refer another sheet by the name to transfer the data.
  var destSheet = ss.getSheetByName("ToTransferSheetName");
//Check the last filled data and add the transfer data next to that.
  var lastRow = destSheet.getLastRow();
  if (lastRow) destSheet.insertRowAfter(lastRow);
//Copy all the data from given range with value(without formula/ format)
  source.copyTo(destSheet.getRange(lastRow + 1,1), {contentsOnly: true});
}
