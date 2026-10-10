# My Organiser

A calm, private organiser for deadlines and a student budget (HSBC = everyday spending, Monzo = savings).
Everything is in £, dates are DD/MM/YYYY, and "today" is always worked out in UK time.

**Your data never leaves your device.** No accounts, no analytics, nothing loaded from the internet.

---

## What's in the folder

| File | What it is |
|------|------------|
| `index.html` | The whole app (page, styles and code) |
| `manifest.webmanifest` | Tells phones the app's name, icon and colours |
| `service-worker.js` | Lets the app open with no internet |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | App icons |
| `lib/jszip.min.js` | Small library used to build and read Excel files (stored locally) |
| `TESTING.md`, `tests/` | Checklist and the automated test script |

Keep all the files together in one folder.

---

## 1. Opening it

**On your laptop:** double-click `index.html`. It opens in your browser and saves as you go.
(When opened this way it doesn't need the internet at all. The "works offline as an app" part only applies when hosted — see section 6.)

**On your iPhone:** iPhones can't really run an HTML file from the Files app, so host the folder for free on GitHub Pages (section 6) and add it to your home screen (section 7). It's a one-off 10-minute job.

> ⚠️ Data opened by double-clicking on your laptop and data on your phone are **separate** — they don't sync. Use Export backup / Import backup to move data between them.

---

## 2. Everyday use

- **Add** — type what it is, pick where it goes (Timetable or Budget), fill in the drop-downs, press **Add**. You'll see where it went, with a link.
- **Timetable** — your items sorted by urgency, in tabs: Today (includes anything overdue), This week (next 7 days), Later, No deadline, Done. Tick the circle to mark done. **More** gives Edit, Add to Apple Calendar and Delete. Deleting or ticking shows an **Undo** button for a few seconds.
- **Budget** — balances for both accounts, your monthly HSBC budget, savings goal, upcoming expenses, a spending-by-category chart and recent transactions. Transfers between accounts are never counted as spending. For an upcoming bill, **More → Mark as paid** turns it into a "Money out" dated today.
- **Settings** — starting balances, monthly budget, savings goal, categories, Excel, backup, theme.

The moon/sun button (top right) switches dark/light. **Settings → Theme → Follow my device** goes back to automatic.

---

## 3. Excel export and import

**Export:** Settings → **Export to Excel**. You get `my-organiser-YYYY-MM-DD.xlsx` with four sheets:

- **Timetable** — Title, Has deadline, Deadline, Time, Priority, Note, Done
- **Budget transactions** — Date, Description, Type, Account, From, To, Amount (£), Category
- **Upcoming expenses** — Description, Account, Amount (£), Category, Date added, Due date
- **Settings** — starting balances, monthly budget, savings goal, and your category list

Drop-down lists are built into the workbook for Priority, Has deadline, Done, Type, Account / From / To, and Category (the Category list reads from the Settings sheet). Amount and date columns also refuse obviously wrong values.

> **About the library:** you suggested ExcelJS. It couldn't be downloaded in the environment this was built in, so the app writes the `.xlsx` itself using the small, well-known JSZip library (bundled in `lib/`). The result is a genuine Excel workbook with real drop-downs — checked by opening it in two independent spreadsheet readers. No CSV fallback was needed.

**Import:** edit the workbook in Excel (keep the column headings in row 1), save it, then Settings → **Import from Excel/CSV**.
- Choose **Add to my data** (skips anything already there) or **Replace my data** (asks you to confirm first).
- Every row is checked. Rows with problems are **listed with the sheet, row number and reason** — nothing is silently dropped. Fix them and import again; rows already imported will be skipped as duplicates.
- You can also import a single sheet saved as **CSV** (File → Save As → CSV UTF-8). The app recognises which sheet it is from the headings.
- A transaction with a category that isn't in your list is rejected — add the category in Settings first.

Excel and the app don't sync live; it's always export → edit → import.

---

## 4. Apple Calendar

- **One item:** Timetable → **More → Add to Apple Calendar**.
- **Everything with a deadline:** the **Add all to Apple Calendar** button at the bottom of the Timetable.

This downloads an `.ics` file. Open it and choose **Add to Calendar**. Items with only a date become all-day events; items with a time become one-hour events in UK time, with a reminder.

This is a **one-time export, not a live sync.** If you change a deadline later, export again — Calendar recognises the same item and updates it rather than adding a second copy. Deleting or ticking something here does **not** remove it from your calendar.

On iPhone, when the app is opened from the home screen, the button opens the Share sheet instead — pick **Calendar** (or **Save to Files**, then open the file).

---

## 5. Backing up your data (please do this weekly)

Your data lives in your browser's storage. Browsers can clear it (low storage, "clear history", iOS removing data from home-screen apps you haven't opened for weeks). A backup protects you.

- **Export backup** (Settings) saves a small `my-organiser-backup-YYYY-MM-DD.json` file. Keep it in iCloud Drive, OneDrive, or email it to yourself.
- **Import backup** restores it. It **replaces** what's in the app (you'll be asked to confirm).
- Settings shows the date of your last backup and nudges you after 7 days.

**Clear all data** wipes everything (after confirmation). **Load sample data** adds a few generic example items so you can try things out — delete them one by one afterwards, or Clear all.

---

## 6. Putting it online with GitHub Pages (free) — step by step for beginners

You only do this once. It gives you a private-ish web address (only people you give it to will find it) that your iPhone can install. Your **data** still stays on your phone — GitHub only stores the app files.

1. **Make a GitHub account.** Go to <https://github.com>, click **Sign up**, follow the steps and verify your email.
2. **Create a repository** (a folder on GitHub). Click the **+** at the top right → **New repository**.
   - Repository name: `my-organiser`
   - Choose **Public** (free GitHub Pages needs public repositories; the files contain no personal data).
   - Tick **Add a README file**.
   - Click **Create repository**.
3. **Upload the app files.** On the repository page click **Add file → Upload files**.
   - Unzip the download, open the `my-organiser` folder, select **everything inside it** (including the `lib` and `tests` folders) and drag it all onto the upload area. Chrome, Edge and Safari keep the folders when you drag them.
   - Check the list: `index.html` must be at the top level, and `lib/jszip.min.js` must appear as a file inside `lib`.
   - Click **Commit changes**.
4. **Turn on GitHub Pages.** Click **Settings** (on the repository's top bar) → **Pages** (left menu).
   - Under **Build and deployment → Source**, choose **Deploy from a branch**.
   - Branch: **main**, folder: **/ (root)**. Click **Save**.
5. **Wait 1–2 minutes**, refresh the Pages screen, and you'll see "Your site is live at `https://YOUR-USERNAME.github.io/my-organiser/`". Open that link to check it works.

**Updating later:** upload the changed files again (same names overwrite). Then open `service-worker.js` on GitHub, click the pencil, change `VERSION = 'v1.0.0'` to `'v1.0.1'`, and commit. Phones pick up the new version the next time the app is opened (sometimes the time after).

---

## 7. Adding it to your iPhone home screen

1. On your iPhone open **Safari** (it must be Safari) and go to `https://YOUR-USERNAME.github.io/my-organiser/`.
2. Wait for it to load fully once (this saves it for offline use).
3. Tap the **Share** button (square with an arrow pointing up).
4. Scroll down and tap **Add to Home Screen**. The name will be "My Organiser". Tap **Add**.
5. Open it from the new icon. It runs full-screen like an app and **works with no internet**.

Tip: data in Safari and data in the home-screen app are kept separately by iOS. Pick the home-screen app and use that.

---

## 8. Troubleshooting

- **"Your browser is blocking storage"** — you're in a private window or storage is blocked. The app still works, but only until you close it. Use Export backup.
- **Excel export says the library didn't load** — the `lib` folder must sit next to `index.html`.
- **Dates look like MM/DD in the date picker on a laptop** — that's your browser's own setting. The line under each date box always repeats the date as DD/MM/YYYY so you can check.
- **Changes don't show on the phone after updating** — bump `VERSION` in `service-worker.js` (section 6), then close and reopen the app twice.

## Privacy

No data leaves your device: there are no servers, accounts, analytics, fonts or scripts from other sites. A Content-Security-Policy in `index.html` blocks the page from contacting any other site even by accident. Files you export (Excel, backup, calendar) go wherever you choose to save them.
