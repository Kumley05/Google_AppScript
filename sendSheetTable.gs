function sendSheetTableEmail() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  var numRows = dataRange.getNumRows();
  var numCols = dataRange.getNumColumns();

  // Get current full date string, e.g. "Saturday, September 27, 2025"
  var today = new Date();
  var formattedDate = Utilities.formatDate(today, Session.getScriptTimeZone(), " MMMM d, yyyy");
  var dayName = Utilities.formatDate(today, Session.getScriptTimeZone(), "EEEE");

  

  // Build HTML table with exact formatting
  var htmlTable = '<table style="border-collapse:collapse;">';

  for (var i = 1; i <= numRows; i++) {
    htmlTable += '<tr>';
    for (var j = 1; j <= numCols; j++) {
      var cell = sheet.getRange(i, j);
      var value = data[i - 1][j - 1];

      // Capture all styles from the cell
      var bgColor = cell.getBackground();
      var fontColor = cell.getFontColor();
      var fontWeight = cell.getFontWeight();
      var fontStyle = cell.getFontStyle();
      var fontSize = cell.getFontSize();
      var hAlign = cell.getHorizontalAlignment();
      var vAlign = cell.getVerticalAlignment();
      var borderStyle = "1px solid #999";

      // Construct inline CSS style
      var style = "padding:5px;" +
                  "background-color:" + bgColor + ";" +
                  "color:" + fontColor + ";" +
                  "font-weight:" + fontWeight + ";" +
                  "font-style:" + fontStyle + ";" +
                  "font-size:" + fontSize + "px;" +
                  "text-align:" + hAlign + ";" +
                  "vertical-align:" + vAlign + ";" +
                  "border:" + borderStyle + ";";

      // First row uses <th> for headers
      if (i === 1) {
        htmlTable += '<th style="' + style + '">' + value + '</th>';
      } else {
        htmlTable += '<td style="' + style + '">' + value + '</td>';
      }
    }
    htmlTable += '</tr>';
  }
  htmlTable += '</table>';
  
  // Email parameters
  var recipient = "naveenkumar.m@dvarakgfs.com"; // Replace with actual recipient email
  var subject = "Automated Report - Spreadsheet Table Test";
  var body = "Dear Team,<br><br>Here is the report for <b>" + formattedDate + " ("+ dayName +")"+ "</b>:<br><br>" + htmlTable + "<br>Best regards,<br>Naveen Kumar M";
  
  // Send email with HTML body
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: body,
  });
}
