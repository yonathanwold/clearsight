# Smart Budget Tracker

## Overview

Smart Budget Tracker is a frontend-only personal finance dashboard that helps users track income, expenses, spending categories, monthly trends, and overall financial health. Users can add and delete transactions, view summary metrics, analyze category spending, compare monthly income against expenses, and keep their data after refresh through LocalStorage.

The app is designed to be clean and professional while staying simple enough to explain during a live technical walkthrough.

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Start the local development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Tech Stack

- JavaScript
- React
- Vite
- Recharts
- LocalStorage
- Plain CSS

## Architecture

The application is organized around clear React components and small utility files:

- `src/App.jsx` manages the main transaction state, loads saved data, saves updates to LocalStorage, and passes derived data into the UI sections.
- `src/components/` contains reusable UI sections including the header, dashboard cards, transaction form, charts, insights panel, transaction list, and empty state.
- `src/utils/calculations.js` contains the financial calculations for totals, savings rate, category breakdowns, monthly trends, and rule-based insights.
- `src/utils/storage.js` handles LocalStorage loading and saving.
- `src/utils/formatters.js` keeps currency, percentage, date, and month formatting consistent.
- `src/data/` contains transaction categories and starter sample data.
- `src/App.css` contains the responsive layout, card styling, form styling, chart layout, and mobile breakpoints.

Charts are generated programmatically from the transaction data, so adding or deleting a transaction updates the dashboard, insights, and charts together.

## AI Tools Used

- Tool: OpenAI Codex / ChatGPT
- How I used it:
  - Used it as a coding assistant while I planned and built the app
  - Asked for suggestions on how to split the project into components and utility files
  - Used it to check my approach for LocalStorage persistence and derived dashboard calculations
  - Asked for help thinking through Recharts data shapes for category and monthly charts
  - Used it for debugging help when checking form validation and state updates
  - Used it to review wording and organization in the README
- Prompts that worked well:
  - "How should I structure a React finance dashboard with components and utility files?"
  - "What is a simple way to save transactions in LocalStorage and load them when the app starts?"
  - "How can I convert transaction data into chart data for Recharts?"
  - "Review this README section and make sure the AI usage documentation is clear."
- What I did and reviewed manually:
  - Chose the final project idea and feature scope
  - Reviewed and adjusted the component structure
  - Component state flow
  - Financial calculations
  - LocalStorage behavior
  - Chart data formatting
  - Form validation
  - Responsive layout
  - Visual hierarchy and spacing
  - Ran the app locally and tested adding, deleting, refreshing, and validation behavior

## Key Design Decisions

- The app is frontend-only because the challenge allows a client-side solution and the core goal is to demonstrate React state, UI structure, data transformation, and persistence.
- LocalStorage was used because it lets transactions persist after refresh without requiring a backend, database, authentication, or external API.
- Financial calculations were separated into utility files so totals, savings rate, category breakdowns, monthly trends, and insights are easy to find and explain.
- Recharts was used for the charting requirement because it works well with React and can generate charts directly from local transaction data.
- Sample data only appears when there is no saved LocalStorage data, so the first demo looks complete while still preserving real user-entered transactions after refresh.
- The UI uses a simple card-based dashboard layout so the summary metrics, form, charts, insights, and transactions are easy to scan.
- I used plain CSS instead of a large UI library so the styling stays readable and easier to explain.

## Challenges & How You Solved Them

- Keeping dashboard cards, charts, insights, and the transaction list synced:
  - I solved this by storing transactions in one state array in `App.jsx` and deriving all dashboard data from that same source.
- Persisting user data after refresh:
  - I used LocalStorage helper functions to load saved transactions on startup and save changes whenever the transaction list updates.
- Formatting financial data clearly:
  - I moved currency, percentage, date, and month formatting into `utils/formatters.js` so display values stay consistent across the app.
- Making the UI polished without overcomplicating the code:
  - I kept the visual complexity mostly in CSS and kept the React components readable.
- Where AI helped:
  - AI helped when I wanted a second opinion on structure, chart data transformations, LocalStorage behavior, and README wording.
- Where AI fell short:
  - AI suggestions still needed to be reviewed and adjusted. I simplified parts of the design, checked the calculations, verified the app in the browser, and made sure the final code was understandable enough for a live walkthrough.

## What I'd Improve With More Time

- CSV export for transactions
- Monthly budget goals
- Recurring transactions
- Spending alerts
- More advanced filtering and search
- Editable transactions
- Optional user accounts with backend persistence
