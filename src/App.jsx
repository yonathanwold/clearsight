import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import DashboardCards from './components/DashboardCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import Insights from './components/Insights';
import { sampleTransactions } from './data/sampleTransactions';
import {
  calculateCategoryBreakdown,
  calculateMonthlyTrends,
  calculateTotals,
  getCurrentMonthSummary,
  getFinancialInsights,
} from './utils/calculations';
import { loadTransactions, saveTransactions } from './utils/storage';

function App() {
  // Load saved transactions once when the app first opens.
  // If LocalStorage is empty, the app starts with sample data for the demo.
  const [transactions, setTransactions] = useState(() => loadTransactions(sampleTransactions));

  // Keep LocalStorage in sync any time the transaction list changes.
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // These values are all calculated from the same transaction array.
  // That makes the dashboard easier to reason about because there is one source of truth.
  const totals = useMemo(() => calculateTotals(transactions), [transactions]);
  const categoryData = useMemo(() => calculateCategoryBreakdown(transactions), [transactions]);
  const monthlyData = useMemo(() => calculateMonthlyTrends(transactions), [transactions]);
  const currentMonth = useMemo(() => getCurrentMonthSummary(transactions), [transactions]);
  const insights = useMemo(() => getFinancialInsights(transactions), [transactions]);

  // New transactions are added to the beginning so the newest item appears first.
  const addTransaction = (transaction) => {
    setTransactions((currentTransactions) => [transaction, ...currentTransactions]);
  };

  // Delete works by keeping every transaction except the one with the matching id.
  const deleteTransaction = (transactionId) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== transactionId),
    );
  };

  return (
    <div className="app-shell">
      <Header transactionCount={transactions.length} totals={totals} currentMonth={currentMonth} />

      <main>
        <DashboardCards totals={totals} currentMonth={currentMonth} />

        <div className="workspace-grid">
          <div className="left-column">
            <TransactionForm onAddTransaction={addTransaction} />
            <Insights insights={insights} />
          </div>

          <div className="right-column">
            <Charts categoryData={categoryData} monthlyData={monthlyData} />
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={deleteTransaction}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
