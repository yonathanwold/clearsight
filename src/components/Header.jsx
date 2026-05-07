import { formatCurrency, formatPercentage } from '../utils/formatters';

function Header({ transactionCount, totals, currentMonth }) {
  return (
    <header className="app-header">
      <div>
        <p className="app-kicker">Frontend-only finance dashboard</p>
        <h1>Smart Budget Tracker</h1>
        <p>
          Track income, expenses, spending categories, and financial health with a
          simple React dashboard that saves data in the browser.
        </p>
      </div>

      <div className="header-summary" aria-label="Quick app summary">
        <div>
          <span>{transactionCount}</span>
          <p>Transactions</p>
        </div>
        <div>
          <span>{formatCurrency(totals.balance)}</span>
          <p>Current balance</p>
        </div>
        <div>
          <span>{formatPercentage(totals.savingsRate)}</span>
          <p>Savings rate</p>
        </div>
        <div>
          <span>{currentMonth.monthLabel}</span>
          <p>Current month</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
