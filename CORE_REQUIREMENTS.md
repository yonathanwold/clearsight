# Core Requirements Document

## Project Name

Smart Budget Tracker

## Challenge Idea

Build a personal finance management application that helps a user track income, expenses, and financial health over time.

## Main Goal

Create a frontend-only React application where users can enter transactions, see their financial summary, view charts, and keep their data after refreshing the browser.

## Core Features

- Add income transactions
- Add expense transactions
- Delete transactions
- Save transactions in LocalStorage
- Load saved transactions when the app opens
- Show sample data when there is no saved data yet
- Calculate total income
- Calculate total expenses
- Calculate current balance
- Calculate savings rate
- Identify the largest spending category
- Show rule-based financial insights
- Display category spending in a chart
- Display monthly income vs expenses in a chart

## Data Fields

Each transaction includes:

- `id`
- `type`
- `description`
- `amount`
- `category`
- `date`

## Categories

Income categories:

- Job
- Internship
- Freelance
- Other

Expense categories:

- Food
- Rent
- Transportation
- School
- Entertainment
- Utilities
- Other

## Validation Rules

- Description is required
- Amount must be greater than 0
- Category is required
- Date is required

## Technical Requirements

- React
- Vite
- JavaScript
- Recharts
- LocalStorage
- Plain CSS
- No backend
- No database
- No authentication
- No paid external APIs

## How I Know It Is Complete

- The app runs locally with `npm install` and `npm run dev`
- A user can add transactions
- A user can delete transactions
- Saved data persists after refresh
- Dashboard cards update when data changes
- Charts update when data changes
- Insights update when data changes
- The layout works on desktop and mobile
- README includes AI usage documentation
