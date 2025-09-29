function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Naveen Automation')
    .addItem('Send Spreadsheet Email', 'emailSheetAsExcel')
    .addItem('Send Table Email', 'sendSheetTableEmail')
    .addToUi();
}


function emailSheetAsExcel() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetId = sheet.getId();
  var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + sheetId + "&exportFormat=xlsx";

  var params = {
    method: "get",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, params);
  var blob = response.getBlob().setName(sheet.getName() + ".xlsx");

  // Define recipients
  var emailAddress = "naveenkumar.m@dvarakgfs.com"; 
  var cc = "gouthaman.tk@dvarakgfs.com";

  // You need to define htmlTable variable or construct it
  var htmlTable = "";

  var subject = "Your Spreadsheet as Excel file Test";
  var body = "Dear Team,<br><br>Please find below the latest report table:<br><br>" + htmlTable + "<br>Best regards,<br>Naveen Kumar M";

  // Send email with attachment, including CC and HTML body
  MailApp.sendEmail({
    to: emailAddress,
    cc: cc,
    subject: subject,
    htmlBody: body,
    attachments: [blob]
  });
}
