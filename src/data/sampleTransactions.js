// This helper creates sample dates relative to the current month.
// It keeps the demo data feeling current instead of being stuck in one year.
const getDateForMonth = (monthOffset, day) => {
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth() + monthOffset, day);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const safeDay = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${safeDay}`;
};

// Starter data is only used when LocalStorage is empty.
// Once the user adds or deletes anything, their saved data takes over.
export const sampleTransactions = [
  {
    id: 'sample-1',
    type: 'income',
    amount: 3200,
    category: 'Job',
    date: getDateForMonth(0, 5),
    description: 'Part-time job paycheck',
  },
  {
    id: 'sample-2',
    type: 'income',
    amount: 900,
    category: 'Internship',
    date: getDateForMonth(0, 15),
    description: 'Internship stipend',
  },
  {
    id: 'sample-3',
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    date: getDateForMonth(0, 1),
    description: 'Apartment rent',
  },
  {
    id: 'sample-4',
    type: 'expense',
    amount: 245,
    category: 'Food',
    date: getDateForMonth(0, 8),
    description: 'Groceries and meals',
  },
  {
    id: 'sample-5',
    type: 'expense',
    amount: 86,
    category: 'Transportation',
    date: getDateForMonth(0, 12),
    description: 'Metro card refill',
  },
  {
    id: 'sample-6',
    type: 'expense',
    amount: 165,
    category: 'School',
    date: getDateForMonth(0, 14),
    description: 'Course materials',
  },
  {
    id: 'sample-7',
    type: 'expense',
    amount: 120,
    category: 'Utilities',
    date: getDateForMonth(0, 16),
    description: 'Electric and internet',
  },
  {
    id: 'sample-8',
    type: 'expense',
    amount: 78,
    category: 'Entertainment',
    date: getDateForMonth(0, 20),
    description: 'Movie night',
  },
  {
    id: 'sample-9',
    type: 'income',
    amount: 3100,
    category: 'Job',
    date: getDateForMonth(-1, 5),
    description: 'Part-time job paycheck',
  },
  {
    id: 'sample-10',
    type: 'income',
    amount: 450,
    category: 'Freelance',
    date: getDateForMonth(-1, 19),
    description: 'Website update project',
  },
  {
    id: 'sample-11',
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    date: getDateForMonth(-1, 1),
    description: 'Apartment rent',
  },
  {
    id: 'sample-12',
    type: 'expense',
    amount: 310,
    category: 'Food',
    date: getDateForMonth(-1, 10),
    description: 'Groceries and campus meals',
  },
  {
    id: 'sample-13',
    type: 'expense',
    amount: 95,
    category: 'Transportation',
    date: getDateForMonth(-1, 13),
    description: 'Fuel and transit',
  },
  {
    id: 'sample-14',
    type: 'expense',
    amount: 118,
    category: 'Utilities',
    date: getDateForMonth(-1, 17),
    description: 'Utilities',
  },
  {
    id: 'sample-15',
    type: 'expense',
    amount: 126,
    category: 'Entertainment',
    date: getDateForMonth(-1, 22),
    description: 'Concert ticket',
  },
  {
    id: 'sample-16',
    type: 'income',
    amount: 2950,
    category: 'Job',
    date: getDateForMonth(-2, 5),
    description: 'Part-time job paycheck',
  },
  {
    id: 'sample-17',
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    date: getDateForMonth(-2, 1),
    description: 'Apartment rent',
  },
  {
    id: 'sample-18',
    type: 'expense',
    amount: 285,
    category: 'Food',
    date: getDateForMonth(-2, 9),
    description: 'Groceries',
  },
  {
    id: 'sample-19',
    type: 'expense',
    amount: 140,
    category: 'School',
    date: getDateForMonth(-2, 18),
    description: 'Lab supplies',
  },
];
