import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import EmptyState from './EmptyState';
import { formatCurrency } from '../utils/formatters';

// These chart colors are reused for each category slice.
const categoryColors = ['#2563eb', '#16a34a', '#f97316', '#9333ea', '#dc2626', '#0891b2', '#64748b'];

const currencyTooltipFormatter = (value) => formatCurrency(value);

function Charts({ categoryData, monthlyData }) {
  const hasCategoryData = categoryData.length > 0;
  const hasMonthlyData = monthlyData.length > 0;

  return (
    <section className="charts-section">
      <article className="panel chart-panel">
        <div className="section-heading">
          <h2>Category spending</h2>
          <p>Expense totals grouped by category.</p>
        </div>

        {hasCategoryData ? (
          <div className="chart-frame">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={entry.category}
                      fill={categoryColors[index % categoryColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={currencyTooltipFormatter}
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #dbe3ef',
                    borderRadius: 8,
                    color: '#0f172a',
                  }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyState
            title="No expense data"
            message="Add an expense to see category spending."
          />
        )}
      </article>

      <article className="panel chart-panel">
        <div className="section-heading">
          <h2>Monthly trend</h2>
          <p>Income compared with expenses for each month.</p>
        </div>

        {hasMonthlyData ? (
          <div className="chart-frame">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  formatter={currencyTooltipFormatter}
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #dbe3ef',
                    borderRadius: 8,
                    color: '#0f172a',
                  }}
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#16a34a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyState
            title="No trend data"
            message="Add transactions with dates to build monthly trends."
          />
        )}
      </article>
    </section>
  );
}

export default Charts;
