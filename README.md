# ☁️ CloudCore Trainee Academy

An interactive, game-style onboarding site for new CloudCore trainees.
It's pure HTML/CSS/JS: no build step and no server needed.

**15 chapters** in the official training order: Welcome → Networking → Linux → Windows → Basic Storage → NetApp → SAN → Object Storage → Hardware → Network / Storage / General Virtualization → Commvault → Final break-and-fix lab → Shift & office week.

Each chapter has:
- 📖 **Term flip-cards** per subsection (≈440 terms in total)
- ❓ **Mini quiz** after every subsection, with instant feedback, XP and stars. Answers are shuffled every attempt, and each subsection has a pool of **extra questions** used only after a failed attempt, so retries show new questions (editable in Edit mode)
- 🎮 **90 mini-games of 15 kinds**, all collected on the **Arcade** page:
  - Puzzle-style: 🟪 Connections (find 4 groups of 4), 🟩 Word Guess (6 tries), 📍 Pinpoint (guess the term from clues)
  - Quick-fire: ⚡ Term Blitz (60-second speed round built from each chapter's terms), ⚖️ True/False with lives
  - Matching: 🧠 Memory, 🔗 Match-up, 🧺 Sort-it, ☑️ Pick-all, 🔢 Put-in-order
  - Hands-on: 🧮 Subnet Sniper, 🔐 Permission Painter (chmod), ⌨️ Linux/CMD terminal, 💽 RAID builder, ✍️ Fill the gap
- 🧪 **Labs**: the team's lab checklists, plus links to outside labs (Linux Survival, OverTheWire, Killercoda, NetApp Lab on Demand, VMware HOL…)
- 🏆 **Chapter test** placeholders, ready for the trainers to fill in

Basic Storage has three interactive labs with 14 missions: disk anatomy, a RAID builder (you can fail disks!), architecture and protocol sorting, "put the steps in order" processes (FC LUN, NFS mount, DB restore), snapshot and efficiency sorting, and backup-restore puzzles.

Every chapter has a **📋 All terms** page listing the whole chapter on one screen, with a 🔎 research shortcut per term (printable). The orientation stresses that the cards are only the headline: trainees must research each term to understand what happens behind the scenes.

## Trainee tracking

- On first visit, each trainee picks or creates their **name** (no password). Each name has its own XP, cards, quizzes, mini-games, labs and test scores.
- **📈 My progress** shows a per-chapter report.
- Progress is stored in the browser (localStorage). To move it to another computer, or to send it to a trainer, use **Export my progress**. The trainer can **Import** the file to see the trainee on the "Who's learning?" page.

### Trainer progress sheet (Google Sheets)

When `js/sync-config.js` has a URL, the site sends each trainee's progress to a Google Sheet automatically. It sends about 8 seconds after any change, and right away when a test is submitted or the tab is closed. The sheet gets:
- **Trainees**: one row per trainee: name, last update, overall %, XP/level, terms, quizzes, mini-games, labs, tests submitted, % per chapter, and the full progress JSON.
- **Test answers**: one row per trainee per chapter test, with each question and the trainee's answer.

One-time setup:
1. Create a new Google Sheet (e.g. "CloudCore Academy – Progress").
2. **Extensions → Apps Script**. Delete the sample code, paste in all of [`sync/Code.gs`](sync/Code.gs), and save.
3. **Deploy → New deployment →** gear icon **→ Web app**. Set *Execute as*: **Me**, and *Who has access*: **Anyone**. Click **Deploy** and approve the permissions.
4. Copy the **Web app URL** (it ends with `/exec`), put it in `url` in `js/sync-config.js`, then commit and push.

### 🧑‍🏫 Trainer mode

Trainers and trainees use the same site. Trainers unlock extra features with a **trainer password**:
- the **🧑‍🏫 Trainer** button (top bar) opens a **dashboard of every trainee**, read live from the sheet: last active, overall %, XP, terms, quizzes, games, labs and tests. You can sort and filter it. Click a trainee to see their per-chapter progress and their **written test answers**. Any columns you add to the Trainees tab (e.g. "Grade") show up there too.
- **✏️ Edit** mode appears only in trainer mode.

The password is checked by the Apps Script, so it's never in the site's code. To set it, open Apps Script, go to **⚙️ Project Settings → Script properties → Add script property**, and add `TRAINER_PASSWORD` = your password. To change it later, edit that property. No redeploy is needed. Trainer mode lasts for the browser tab session. **🔒 Lock trainer mode** ends it. After 20 wrong passwords in 10 minutes, logins pause for 10 minutes.

The sheet itself stays private to whoever you share it with.

The URL and key are visible in the site's code, so anyone technical could send fake rows. That's fine for training progress, but don't put sensitive data in the sheet. If you ever change `SHARED_KEY` in `Code.gs`, change `key` in `js/sync-config.js` to match. After editing `Code.gs`, redeploy with **Deploy → Manage deployments → Edit → New version**.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8765
```

Then browse to http://localhost:8765.

## Editing content (terms, quizzes, labs, tests)

All content lives in **`js/content.js`**.

**The easy way: in the site**
1. Click **✏️ Edit** in the top bar.
   (Only in trainer mode when a progress sheet is connected; see *Trainer mode*.)
2. Edit chapter details, section titles, terms, quiz questions (pick the correct answer with the radio button), labs, and chapter tests. Add or delete anything with the + and 🗑 buttons.
3. Edits save automatically **in your browser only**.
4. Click **⬇ Export content.js** and replace `js/content.js` in the repo with the downloaded file. Everyone sees the changes once the file is committed.

Advanced edits (e.g. the mini-games) go through **{ } Edit chapter JSON** or **{ } Course JSON**.

**Or edit the file directly.** The shape is documented at the top of `js/content.js`.

### Chapter tests

The trainers' **written tests** are built in (chapters 2–8 and 10–13; Hardware has none yet), translated to English.

**🔒 The tests are password-protected.** In `js/content.js` they're encrypted (AES-256-GCM, key derived from the password with PBKDF2-SHA256, 250k iterations), so they can't be read from the source. The password is not stored anywhere in the repo; trainers hand it out. Entering it unlocks all tests for that browser tab session. Trainees' saved answers are kept regardless of the lock. To edit the tests, unlock them, use Edit mode, then **Export content.js**: the tests are re-encrypted automatically.
- Trainees type their answers per question (with a/b/c sub-questions). Answers **autosave** per trainee.
- Trainees click **Submit for review**, and send the answers with **Download my answers** (a .txt file) or with their exported progress file. A trainer who imports the progress file can switch to that trainee and read the answers on the test page.
- Submitting completes the chapter's test step.

Each chapter's test is `test: { url, questions: [], written: [] }`. In Edit mode, open the 🏆 step to:
- edit or add **written questions** (optional heading, sub-questions, a fixed-width block for tables/output, bonus flag);
- add optional **multiple-choice** questions (auto-graded, 70% pass mark);
- or link an outside test in `url`.

The original test photos stay in the local `tests/` folder, which is not uploaded to GitHub.

## Hosting (GitHub Pages, automatic)

The workflow `.github/workflows/deploy-pages.yml` publishes the site on **every push to `main`**. It also checks that `js/content.js` still loads, so a broken edit won't go live.

One-time setup: **Settings → Pages → Source: "GitHub Actions"**.
After that, every push goes live at `https://<user>.github.io/cloudcore_training/` within about a minute. You can follow each deploy in the **Actions** tab, and re-run one by hand there with "Run workflow".

⚠️ GitHub Pages sites on free accounts are **public**.
