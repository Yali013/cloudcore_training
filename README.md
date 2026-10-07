# ☁️ CloudCore Trainee Academy

An interactive, game-style onboarding site for new CloudCore trainees.
It's pure HTML/CSS/JS: no build step and no server needed.

**15 chapters** in the official training order: Welcome → Networking → Linux → Windows → Basic Storage → NetApp → SAN → Object Storage → Hardware → Network / Storage / General Virtualization → Commvault → Final break-and-fix lab → Shift & office week.

Each chapter has:
- 📖 **Term flip-cards** per subsection (≈440 terms in total)
- ❓ **Mini quiz** after every subsection, with instant feedback, XP and stars
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
2. Edit chapter details, section titles, terms, quiz questions (pick the correct answer with the radio button), labs, and chapter tests. Add or delete anything with the + and 🗑 buttons.
3. Edits save automatically **in your browser only**.
4. Click **⬇ Export content.js** and replace `js/content.js` in the repo with the downloaded file. Everyone sees the changes once the file is committed.

Advanced edits (e.g. the mini-games) go through **{ } Edit chapter JSON** or **{ } Course JSON**.

**Or edit the file directly.** The shape is documented at the top of `js/content.js`.

### Adding the chapter tests

Each chapter has `test: { url: "", questions: [] }`. Either:
- add multiple-choice questions (in Edit mode: open the 🏆 step → "+ Add question"); the pass mark is 70%; or
- put a link to an external form in `url` (e.g. an online form).

## Hosting (free, when you're ready)

This repo isn't published yet. To host it free on GitHub Pages:
1. Push this folder to GitHub.
2. Go to **Settings → Pages**, set **Source = Deploy from a branch**, then pick `main` and `/ (root)`.
3. The site appears at `https://<user>.github.io/cloudcore_training/`.

⚠️ GitHub Pages sites on free accounts are **public**. The content mentions internal names, so decide whether that's OK first.
