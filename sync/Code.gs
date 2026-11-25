/**
 * CloudCore Academy – trainer progress sheet.
 *
 * Paste this whole file into the sheet's Apps Script editor (Extensions → Apps Script),
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * The site sends each trainee's progress here; this script keeps:
 *   • "Trainees"     – one row per trainee (summary + full progress JSON)
 *   • "Test answers" – one row per trainee per chapter test (their written answers)
 *
 * SHARED_KEY must match the key in js/sync-config.js on the site.
 */
const SHARED_KEY = 'cca-2j9B52q-sF8hZSb38Asb0D0U';

const TRAINEES = 'Trainees';
const ANSWERS = 'Test answers';
const T_HEAD = ['Trainee ID', 'Name', 'Avatar', 'Last update', 'Overall %', 'XP', 'Level', 'Terms learned',
  'Quizzes passed', 'Mini-games', 'Labs done', 'Tests submitted', 'Progress per chapter', 'Progress JSON'];
const A_HEAD = ['Trainee ID', 'Name', 'Chapter', 'Status', 'Answered', 'Last update', 'Questions & answers'];
const CELL_MAX = 49000; // Google Sheets cells hold up to 50,000 characters

function doGet() {
  return json({ ok: true, msg: 'CloudCore Academy sync is running.' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.key !== SHARED_KEY) return json({ ok: false, error: 'bad key' });
    if (!d.profile || !d.profile.id) return json({ ok: false, error: 'no profile' });
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const now = new Date();
    const s = d.summary || {};

    const t = sheet(ss, TRAINEES, T_HEAD);
    upsert(t, [1], [d.profile.id], [
      d.profile.id, d.profile.name || '', d.profile.avatar || '', now,
      s.overall != null ? s.overall / 100 : '', s.xp || 0, s.level || '', s.terms || '', s.quizzes || '',
      s.games || '', s.labs || '', s.tests || '', clip(s.chapters || ''), clip(JSON.stringify(d.progress || {}))]);
    t.getRange(2, 5, Math.max(1, t.getLastRow() - 1), 1).setNumberFormat('0%');

    const a = sheet(ss, ANSWERS, A_HEAD);
    (d.written || []).forEach((w) => {
      upsert(a, [1, 3], [d.profile.id, w.chapter], [
        d.profile.id, d.profile.name || '', w.chapter, w.status || '', w.answered || '', now, clip(w.text || '')]);
    });
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Get or create a sheet with a bold, frozen header row.
function sheet(ss, name, head) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#E1ECFF');
    sh.setFrozenRows(1);
    sh.setColumnWidth(head.length, 420);
  }
  return sh;
}

// Update the row whose key columns match, or append a new row.
function upsert(sh, keyCols, keyVals, row) {
  const last = sh.getLastRow();
  let target = -1;
  if (last > 1) {
    const width = Math.max.apply(null, keyCols);
    const data = sh.getRange(2, 1, last - 1, width).getValues();
    for (let i = 0; i < data.length; i++) {
      if (keyCols.every((c, k) => String(data[i][c - 1]) === String(keyVals[k]))) { target = i + 2; break; }
    }
  }
  if (target === -1) sh.appendRow(row);
  else sh.getRange(target, 1, 1, row.length).setValues([row]);
}

function clip(s) {
  s = String(s);
  return s.length > CELL_MAX ? s.slice(0, CELL_MAX) + '\n…(truncated)' : s;
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
