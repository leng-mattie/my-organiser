# Testing checklist — My Organiser

20 things to try. Each has the expected result. An automated run of all 20 (headless Chromium, iPhone-sized 375 px screen and a laptop-sized screen) is described at the bottom.

| # | Try this | You should see |
|---|----------|----------------|
| 1 | Open the app with no data. | Add page. Timetable says “A clean slate…”, Top 3 says “Nothing to do yet”. No errors. |
| 2 | On Add, leave the title empty and press **Add**. | Friendly message under the box (“Please type what you need to add.”) and the cursor jumps to it. Nothing is saved. |
| 3 | Timetable item, “Has a deadline?” = Yes, no date picked. | “Pick a deadline date…” error. Choosing **No** hides the date fields and lets it save. |
| 4 | Add a Timetable item due today, High priority. | Confirmation “Added … It went to your Timetable. Go to Timetable →”. Link opens the Timetable, item is in **Today** and shows “Due today”. |
| 5 | Add items due tomorrow, in 3 days, in 10 days, 2 days ago, and one with no deadline. | Lines read “Due tomorrow”, “3 days left”, “10 days left”, “2 days overdue”, “No deadline”, and each sits in the right tab (Today / This week / Later / No deadline). Overdue is first in Today. |
| 6 | Look at **Top 3 for today**. | The 3 most urgent open items, each with a one-line reason (e.g. “2 days overdue — clearing it first…”). |
| 7 | Priority display. | Every item shows a bar icon *and* the words “High/Medium/Low priority”. |
| 8 | Tick an item done, then press **Undo** in the message. | It moves to **Done**, then back again. |
| 9 | **More → Edit** on an item, change the priority, **Save changes**. | Same drop-downs as Add; returns to the Timetable with the change. **Cancel editing** changes nothing. |
| 10 | **More → Delete**, then **Undo**. | Item disappears, then comes back. |
| 11 | Add 6 High-priority items due within the same 3 days. | Gentle “That’s a lot at once” note on the Timetable. |
| 12 | **Add all to Apple Calendar** and **More → Add to Apple Calendar**. | An `.ics` file downloads. Date-only items are all-day events; items with a time are 1-hour events in UK time. Opening it on a Mac/iPhone offers “Add to Calendar”. |
| 13 | Budget: Money out, amount `-5`, `0`, `abc`, `12.345`, `2000000`. | Each gives a clear error (negative / more than £0 / numbers only / two decimal places / over £1,000,000). |
| 14 | Set starting balances (Settings), add Money in to HSBC, Money out from HSBC, and a Transfer HSBC → Monzo. | Account cards add up; Transfer shows under “Transfers in/out” and is **not** counted in spending or the category chart. Total = HSBC + Monzo. |
| 15 | Transfer with From = To. | The other drop-down flips automatically; if forced, error “From and To must be different accounts”. |
| 16 | Set a monthly budget and savings goal; add an Upcoming expense. | Progress bars fill; Today / This week / This month figures show; “HSBC balance after upcoming expenses” = HSBC balance − upcoming. **Mark as paid** turns it into a Money out. |
| 17 | **Export to Excel**, open it. | Four sheets (Timetable, Budget transactions, Upcoming expenses, Settings), dates as DD/MM/YYYY, £ amounts, drop-downs on Priority, Has deadline, Done, Type, Account/From/To, Category. |
| 18 | In Excel, add a good row and a bad row (Priority “Urgent”), save, **Import from Excel/CSV** (Add mode). | Good row added; existing rows skipped as duplicates; the bad row listed as rejected with row number and reason. Also try a single sheet saved as **CSV**. |
| 19 | **Export backup**, **Clear all data**, **Import backup**. | Everything comes back exactly. A random non-backup file is refused with a clear message. |
| 20 | Phone checks: 375 px wide screen, dark mode, offline, midnight. | No sideways scrolling; dark/light follows the phone and the moon/sun button overrides it; after one online visit the hosted app opens in Airplane mode; if left open past midnight, “Due tomorrow” becomes “Due today” by itself. |

## Automated run (done before handing over)

`tests/run_tests.py` drives a headless Chromium through all 20 checks above (with the clock fixed so dates are predictable), at 375×812 and 1280×800, and also:

- checks the page never scrolls sideways at 375 px;
- opens the exported `.xlsx` in a second, independent reader (openpyxl) to confirm the sheets, the data and every drop-down list;
- parses the `.ics` file and checks all-day vs timed events, line endings and line folding;
- serves the folder from a sub-folder over http, loads it once, goes offline, and reloads to confirm the service worker serves everything;
- moves the clock from 23:59 to 00:01 to confirm the midnight rollover;
- blocks `localStorage` to confirm the in-memory fallback and warning banner;
- fails on any console error.

Results are in the summary message from Claude. What it can’t check: a real iPhone, a real Apple Calendar import and real Microsoft Excel — please do numbers 12, 17 and 20 on your own devices once.
