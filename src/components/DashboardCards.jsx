import { formatCurrency, formatPercentage } from '../utils/formatters';
import { getSavingsHealthLabel } from '../utils/calculations';

function DashboardCards({ totals, currentMonth }) {
  // Keeping card data in an array makes the JSX smaller and easy to update.
  const cards = [
    {
      label: 'Total Income',
      value: formatCurrency(totals.totalIncome),
      detail: `${formatCurrency(currentMonth.totalIncome)} in ${currentMonth.monthLabel}`,
      className: 'income-card',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totals.totalExpenses),
      detail: `${formatCurrency(currentMonth.totalExpenses)} in ${currentMonth.monthLabel}`,
      className: 'expense-card',
    },
    {
      label: 'Current Balance',
      value: formatCurrency(totals.balance),
      detail: totals.balance >= 0 ? 'Income is ahead of expenses' : 'Expenses are ahead of income',
      className: 'balance-card',
    },
    {
      label: 'Savings Rate',
      value: formatPercentage(totals.savingsRate),
      detail: `${getSavingsHealthLabel(totals.savingsRate)} financial health`,
      className: 'savings-card',
    },
  ];

  return (
    <section className="dashboard-grid" aria-label="Budget summary">
      {cards.map((card) => (
        <article className={`metric-card ${card.className}`} key={card.label}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
          <span>{card.detail}</span>
        </article>
      ))}
    </section>
  );
}

export default DashboardCards;
