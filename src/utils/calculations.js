import { formatMonthLabel } from './formatters';

// These small helpers make the filter calls below easier to read.
const isIncome = (transaction) => transaction.type === 'income';
const isExpense = (transaction) => transaction.type === 'expense';

export const calculateTotals = (transactions) => {
  // Add together all income transaction amounts.
  const totalIncome = transactions
    .filter(isIncome)
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  // Add together all expense transaction amounts.
  const totalExpenses = transactions
    .filter(isExpense)
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = totalIncome - totalExpenses;
  // Savings rate is the percent of income left after expenses.
  // If income is 0, return 0 to avoid dividing by zero.
  const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

  return {
    totalIncome,
    totalExpenses,
    balance,
    savingsRate,
  };
};

export const calculateCategoryBreakdown = (transactions) => {
  // Build an object like { Food: 200, Rent: 1200 } from expense transactions.
  const categoryTotals = transactions.filter(isExpense).reduce((totals, transaction) => {
    const currentTotal = totals[transaction.category] || 0;
    return {
      ...totals,
      [transaction.category]: currentTotal + Number(transaction.amount),
    };
  }, {});

  // Recharts works well with arrays, so convert the object into an array.
  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((first, second) => second.amount - first.amount);
};

export const getLargestSpendingCategory = (transactions) => {
  const [largestCategory] = calculateCategoryBreakdown(transactions);
  return largestCategory || null;
};

export const calculateMonthlyTrends = (transactions) => {
  // Group transactions by month using the first 7 characters of the date: YYYY-MM.
  const groupedByMonth = transactions.reduce((months, transaction) => {
    const monthKey = transaction.date.slice(0, 7);
    const existingMonth = months[monthKey] || {
      monthKey,
      month: formatMonthLabel(monthKey),
      income: 0,
      expenses: 0,
    };

    // Update either income or expenses depending on the transaction type.
    const updatedMonth = {
      ...existingMonth,
      income: isIncome(transaction)
        ? existingMonth.income + Number(transaction.amount)
        : existingMonth.income,
      expenses: isExpense(transaction)
        ? existingMonth.expenses + Number(transaction.amount)
        : existingMonth.expenses,
    };

    return {
      ...months,
      [monthKey]: updatedMonth,
    };
  }, {});

  // Sort oldest to newest, keep the last 6 months, and add a balance field.
  return Object.values(groupedByMonth)
    .sort((first, second) => first.monthKey.localeCompare(second.monthKey))
    .slice(-6)
    .map((month) => ({
      ...month,
      balance: month.income - month.expenses,
    }));
};

export const getCurrentMonthSummary = (transactions, today = new Date()) => {
  // Create a YYYY-MM key for the current month.
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const currentMonthKey = `${year}-${month}`;
  const currentMonthTransactions = transactions.filter((transaction) =>
    transaction.date.startsWith(currentMonthKey),
  );

  return {
    monthLabel: formatMonthLabel(currentMonthKey),
    ...calculateTotals(currentMonthTransactions),
  };
};

export const getSavingsHealthLabel = (savingsRate) => {
  // These labels are intentionally simple so the logic is easy to explain.
  if (savingsRate >= 25) {
    return 'Strong';
  }

  if (savingsRate >= 10) {
    return 'Stable';
  }

  if (savingsRate >= 0) {
    return 'Tight';
  }

  return 'Needs attention';
};

export const getFinancialInsights = (transactions) => {
  if (transactions.length === 0) {
    return [];
  }

  const totals = calculateTotals(transactions);
  const largestSpendingCategory = getLargestSpendingCategory(transactions);
  const currentMonth = getCurrentMonthSummary(transactions);
  const insights = [];

  // Insight 1: largest spending category.
  if (largestSpendingCategory) {
    insights.push({
      title: `${largestSpendingCategory.category} is your largest spending category.`,
      description: `You have spent ${largestSpendingCategory.amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })} on ${largestSpendingCategory.category.toLowerCase()} across the tracked period.`,
      tone: 'neutral',
    });
  }

  // Insight 2: whether the current month is positive or negative.
  if (currentMonth.totalExpenses > currentMonth.totalIncome) {
    insights.push({
      title: 'Your expenses are higher than your income this month.',
      description: `${currentMonth.monthLabel} is currently running a negative balance. Review flexible categories first.`,
      tone: 'warning',
    });
  } else {
    insights.push({
      title: 'Your current month is cash-flow positive.',
      description: `${currentMonth.monthLabel} income is ahead of expenses by ${(
        currentMonth.balance
      ).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}.`,
      tone: 'positive',
    });
  }

  // Insight 3: overall savings rate.
  if (totals.savingsRate >= 25) {
    insights.push({
      title: 'Your savings rate is strong this month.',
      description: 'A savings rate above 25% gives you room for goals, emergencies, or debt payoff.',
      tone: 'positive',
    });
  } else if (totals.savingsRate >= 10) {
    insights.push({
      title: 'Your savings rate is stable.',
      description: 'You are saving a healthy share of income, with room to tighten variable spending.',
      tone: 'neutral',
    });
  } else {
    insights.push({
      title: 'Your savings rate needs attention.',
      description: 'Small reductions in nonessential spending can improve your balance over time.',
      tone: 'warning',
    });
  }

  return insights;
};
