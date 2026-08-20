/**
 * Wedding RSVP receiver
 * ---------------------
 * Paste this whole file into Extensions -> Apps Script on your RSVP
 * spreadsheet, then Deploy it as a Web app (see RSVP-SETUP.md).
 *
 * Put your email between the quotes below to be notified of each reply.
 */
const NOTIFY_EMAIL = '';

/** Columns, in the order they should appear the first time. */
const COLUMNS = [
  ['submittedAt', 'Submitted'],
  ['firstName',   'First name'],
  ['lastName',    'Last name'],
  ['email',       'Email'],
  ['phone',       'Phone'],
  ['attending',   'Attending'],
  ['guests',      'Party size'],
  ['children',    'Children'],
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

    const header = ensureHeader_(sheet);

    // Build the row to match whatever order the sheet's header is in, so
    // reordering or adding columns later never scrambles old rows.
    const labelFor = {};
    COLUMNS.forEach(function (c) { labelFor[c[1]] = c[0]; });

    const row = header.map(function (label) {
      const key = labelFor[label];
      if (!key) return '';
      let value = data[key] || '';
      if (key === 'submittedAt') value = value ? new Date(value) : new Date();
      if (key === 'attending') {
        value = value === 'yes' ? 'YES' : value === 'no' ? 'no' : '';
      }
      return value;
    });

    sheet.appendRow(row);
    sheet.autoResizeColumns(1, header.length);

    if (NOTIFY_EMAIL) notify_(data);

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Returns the sheet's header labels, creating it if the sheet is empty and
 * adding any columns that aren't there yet. This means new questions can be
 * added to the form later without touching this script again.
 */
function ensureHeader_(sheet) {
  const wanted = COLUMNS.map(function (c) { return c[1]; });

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(wanted);
    sheet.getRange(1, 1, 1, wanted.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    return wanted;
  }

  let header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(function (v) { return String(v).trim(); });

  const missing = wanted.filter(function (label) { return header.indexOf(label) === -1; });

  if (missing.length) {
    sheet.getRange(1, header.length + 1, 1, missing.length).setValues([missing]);
    sheet.getRange(1, 1, 1, header.length + missing.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    header = header.concat(missing);
  }

  return header;
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
