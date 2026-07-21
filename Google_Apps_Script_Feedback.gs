/**
 * সমতায় তারুণ্য ওয়েবসাইটের সেকশনভিত্তিক মতামত Google Sheet-এ সংরক্ষণ করে।
 * এই স্ক্রিপ্টটি Google Sheet > Extensions > Apps Script-এ পেস্ট করুন।
 */
function doPost(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Feedback');

  if (!sheet) {
    sheet = spreadsheet.insertSheet('Feedback');
  }

  const headers = [
    'Submission ID',
    'Submitted At',
    'Name',
    'Page',
    'Section ID',
    'Section Title',
    'Comment',
    'Page URL',
    'User Agent',
    'Status',
    'Internal Notes'
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#082E6E')
      .setFontColor('#FFFFFF');
  }

  const p = (e && e.parameter) ? e.parameter : {};
  const safe = value => {
    const text = String(value || '').trim();
    return /^[=+\-@]/.test(text) ? "'" + text : text;
  };

  sheet.appendRow([
    safe(p.submissionId),
    safe(p.submittedAt || new Date().toISOString()),
    safe(p.name),
    safe(p.page),
    safe(p.sectionId),
    safe(p.sectionTitle),
    safe(p.comment),
    safe(p.pageUrl),
    safe(p.userAgent),
    'নতুন',
    ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput('সমতায় তারুণ্য মতামত সংগ্রহ সেবা সচল আছে।')
    .setMimeType(ContentService.MimeType.TEXT);
}
