/**
 * Wedding RSVP receiver
 * ---------------------
 * Paste this whole file into Extensions -> Apps Script on your RSVP
 * spreadsheet, then Deploy it as a Web app (see RSVP-SETUP.md).
 *
 * Put your email between the quotes below to be notified of each reply.
 */
const NOTIFY_EMAIL = '';

/** The order columns appear in the spreadsheet. */
const COLUMNS = [
  ['submittedAt', 'Submitted'],
  ['firstName',   'First name'],
  ['lastName',    'Last name'],
  ['email',       'Email'],
  ['phone',       'Phone'],
  ['attending',   'Attending'],
  ['guests',      'Party size'],
  ['guestNames',  'Guest names'],
  ['dietary',     'Dietary needs'],
  ['shuttle',     'Shuttle'],
  ['song',        'Song request'],
  ['note',        'Note'],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // stop two guests writing to the same row

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = (e && e.parameter) ? e.parameter : {};

    // Write the header row the first time anything arrives.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map(function (c) { return c[1]; }));
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const row = COLUMNS.map(function (c) {
      const key = c[0];
      let value = data[key] || '';
      if (key === 'submittedAt') {
        value = value ? new Date(value) : new Date();
      }
      if (key === 'attending') {
        value = value === 'yes' ? 'YES' : value === 'no' ? 'no' : '';
      }
      return value;
    });

    sheet.appendRow(row);
    sheet.autoResizeColumns(1, COLUMNS.length);

    if (NOTIFY_EMAIL) {
      notify_(data);
    }

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Lets you open the web app URL in a browser to check it's alive. */
function doGet() {
  return json_({ result: 'ok', message: 'RSVP endpoint is running.' });
}

function notify_(d) {
  const going = d.attending === 'yes';
  const name = ((d.firstName || '') + ' ' + (d.lastName || '')).trim();
  const lines = COLUMNS
    .filter(function (c) { return c[0] !== 'submittedAt' && d[c[0]]; })
    .map(function (c) { return c[1] + ': ' + d[c[0]]; });

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: (going ? '✓ RSVP yes — ' : '✗ RSVP no — ') + (name || 'someone'),
    body: lines.join('\n') + '\n\nAdded to your RSVP spreadsheet.',
  });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
