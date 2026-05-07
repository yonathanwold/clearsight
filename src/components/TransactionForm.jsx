import { useState } from 'react';
import { categoriesByType } from '../data/categories';

const initialFormValues = {
  type: 'expense',
  description: '',
  amount: '',
  category: '',
  date: new Date().toISOString().slice(0, 10),
};

function TransactionForm({ onAddTransaction }) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  // The category dropdown changes depending on income vs expense.
  const activeCategories = categoriesByType[formValues.type];

  const updateField = (field, value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
      // Reset category when the user switches type so an expense category
      // does not accidentally stay selected for an income transaction.
      ...(field === 'type' ? { category: '' } : {}),
    }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const amount = Number(formValues.amount);

    // Each validation message maps directly to one field in the form.
    if (!formValues.description.trim()) {
      nextErrors.description = 'Description is required.';
    }

    if (!amount || amount <= 0) {
      nextErrors.amount = 'Amount must be greater than 0.';
    }

    if (!formValues.category) {
      nextErrors.category = 'Category is required.';
    }

    if (!formValues.date) {
      nextErrors.date = 'Date is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert amount to a number before saving so calculations work correctly.
    onAddTransaction({
      id: crypto.randomUUID(),
      type: formValues.type,
      description: formValues.description.trim(),
      amount: Number(formValues.amount),
      category: formValues.category,
      date: formValues.date,
    });

    setFormValues({
      ...initialFormValues,
      type: formValues.type,
      date: new Date().toISOString().slice(0, 10),
    });
    setErrors({});
  };

  return (
    <section className="panel transaction-form-panel">
      <div className="section-heading">
        <h2>Add transaction</h2>
        <p>Record income or expenses and update every chart instantly.</p>
      </div>

      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <div className="type-toggle" aria-label="Transaction type">
          <button
            type="button"
            className={formValues.type === 'expense' ? 'active' : ''}
            onClick={() => updateField('type', 'expense')}
          >
            Expense
          </button>
          <button
            type="button"
            className={formValues.type === 'income' ? 'active' : ''}
            onClick={() => updateField('type', 'income')}
          >
            Income
          </button>
        </div>

        <label>
          Description
          <input
            type="text"
            value={formValues.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Groceries, paycheck, rent"
            aria-invalid={Boolean(errors.description)}
          />
          {errors.description && <span className="field-error">{errors.description}</span>}
        </label>

        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={formValues.amount}
              onChange={(event) => updateField('amount', event.target.value)}
              placeholder="0.00"
              aria-invalid={Boolean(errors.amount)}
            />
            {errors.amount && <span className="field-error">{errors.amount}</span>}
          </label>

          <label>
            Date
            <input
              type="date"
              value={formValues.date}
              onChange={(event) => updateField('date', event.target.value)}
              aria-invalid={Boolean(errors.date)}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </label>
        </div>

        <label>
          Category
          <select
            value={formValues.category}
            onChange={(event) => updateField('category', event.target.value)}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">Select a category</option>
            {activeCategories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <span className="field-error">{errors.category}</span>}
        </label>

        <button className="primary-button" type="submit">
          Add transaction
        </button>
      </form>
    </section>
  );
}

export default TransactionForm;
