import EmptyState from './EmptyState';

function Insights({ insights }) {
  return (
    <section className="panel insights-panel">
      <div className="section-heading">
        <h2>Financial Insights</h2>
        <p>Rule-based observations from the current transaction data.</p>
      </div>

      {insights.length === 0 ? (
        <EmptyState
          title="No insights yet"
          message="Add a transaction to generate spending and savings observations."
        />
      ) : (
        <div className="insight-list">
          {insights.map((insight) => (
            <article className={`insight-item ${insight.tone}`} key={insight.title}>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Insights;
