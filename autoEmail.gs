const SPREADSHEET_ID = '{SPREADSHEET_LINK}';

const SHEET_NAME = '{SHEET_NAME}';

const EMAIL_COLUMN_INDEX = {COL1_CONTAINS_TO_EMAIL_ADDRESS};

const NAME_COLUMN_INDEX = {COL2_CONTAINS_TO_RECIPIENTNAME};

const PERFORMANCE_COLUMN_INDEX = {COL3_CONTAINS_TO_RECIPIENTNAME_REQUIREMENT1};

const BALANCE_COLUMN_INDEX = {COL4_CONTAINS_TO_RECIPIENTNAME_REQUIREMENT2};

const EMAILM_COLUMN_INDEX = {COL5_CONTAINS_TO_RECIPIENTNAME_REPORTING1};

const EMAILT_COLUMN_INDEX = {COL6_CONTAINS_TO_RECIPIENTNAME_REPORTING2};

function sendEmails() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    const emailAddress = data[i][EMAIL_COLUMN_INDEX - 1];
    const recipientName = data[i][NAME_COLUMN_INDEX - 1];
    const performanceCount = data[i][PERFORMANCE_COLUMN_INDEX - 1];
    const balanceCount = data[i][BALANCE_COLUMN_INDEX - 1];
    const emailAddressM = data[i][EMAILM_COLUMN_INDEX - 1];
    const emailAddressT = data[i][EMAILT_COLUMN_INDEX - 1];

    const subject = `RELAVANT_SUBJECT_LINE || ${recipientName}`;
    const body = `Dear ${recipientName},
--------------------------------------------------------------------------------------------------
---------------------------------------------CONTENT-----------------------------------------------
SIGNATURE`;

    const ccEmail =  emailAddressM + ','+ emailAddressT;
    GmailApp.sendEmail(emailAddress, subject, body, {
      cc: ccEmail
    });
  }
}
