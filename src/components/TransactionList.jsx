import EmptyState from './EmptyState';
import { formatCurrencyWithCents, formatDate } from '../utils/formatters';

function TransactionList({ transactions, onDeleteTransaction }) {
  // Sort a copy of the array so we do not mutate React state directly.
  const sortedTransactions = [...transactions].sort((first, second) =>
    second.date.localeCompare(first.date),
  );

  return (
    <section className="panel transaction-list-panel">
      <div className="section-heading section-heading-with-count">
        <div>
          <h2>Transactions</h2>
          <p>Saved income and expense activity.</p>
        </div>
        <span>{transactions.length}</span>
      </div>

      {sortedTransactions.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          message="Add income or expenses to start building your dashboard."
        />
      ) : (
        <div className="transaction-feed">
          {sortedTransactions.map((transaction) => (
            <article
              className={`transaction-row ${transaction.type}`}
              key={transaction.id}
            >
              <div className="transaction-main">
                <strong>{transaction.description}</strong>
                <span>
                  {transaction.category} / {formatDate(transaction.date)}
                </span>
              </div>

              <div className="transaction-meta">
                <span className={`transaction-type ${transaction.type}`}>
                  {transaction.type === 'income' ? 'Income' : 'Expense'}
                </span>
                <strong className={`amount-cell ${transaction.type === 'income' ? 'positive' : 'negative'}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrencyWithCents(transaction.amount)}
                </strong>
              </div>

              <button
                type="button"
                className="delete-button"
                onClick={() => onDeleteTransaction(transaction.id)}
                aria-label={`Delete ${transaction.description}`}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;
