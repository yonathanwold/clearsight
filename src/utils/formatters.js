// Centralizing display formatting keeps the UI consistent.
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount || 0);

export const formatCurrencyWithCents = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0);

export const formatPercentage = (value) => `${Math.round(value || 0)}%`;

export const formatDate = (dateString) => {
  if (!dateString) {
    return 'No date';
  }

  // Adding T00:00:00 avoids timezone issues where a date can shift by one day.
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${dateString}T00:00:00`));
};

export const formatMonthLabel = (monthKey) => {
  if (!monthKey) {
    return 'Unknown';
  }

  // monthKey is expected to look like "2026-04".
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${monthKey}-01T00:00:00`));
};
