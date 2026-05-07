const STORAGE_KEY = 'smart-budget-tracker-transactions';

// LocalStorage saves everything as text, so this makes sure amount is a number
// after loading the saved JSON back into the app.
const normalizeTransaction = (transaction) => ({
  ...transaction,
  amount: Number(transaction.amount) || 0,
});

export const loadTransactions = (fallbackTransactions = []) => {
  const storedTransactions = localStorage.getItem(STORAGE_KEY);

  // If the user has never opened the app before, show sample data.
  if (!storedTransactions) {
    return fallbackTransactions;
  }

  try {
    const parsedTransactions = JSON.parse(storedTransactions);

    // If saved data is somehow not an array, fall back to sample data.
    if (!Array.isArray(parsedTransactions)) {
      return fallbackTransactions;
    }

    return parsedTransactions.map(normalizeTransaction);
  } catch {
    // If JSON parsing fails, avoid crashing the app.
    return fallbackTransactions;
  }
};

export const saveTransactions = (transactions) => {
  // Convert the transaction array to a JSON string before saving.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};
