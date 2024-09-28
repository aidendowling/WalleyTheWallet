import { currencyFormatter } from "../../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const cardClasses = [
    "card",
    "card-compact",
    "w-96",
    "shadow-xl",
    amount > max ? "bg-error bg-opacity-10" : gray ? "bg-base-200" : "bg-base-100"
  ].join(" ");

  const getProgressColor = (amount, max) => {
    const ratio = amount / max;
    if (ratio < 0.5) return "progress-primary";
    if (ratio < 0.75) return "progress-warning";
    return "progress-error";
  };

  return (
    <div className={cardClasses}>
      <div className="card-body">
        <h2 className="card-title justify-between">
          <span>{name}</span>
          <span className="text-right">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-base-content text-opacity-60 text-sm ml-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </span>
        </h2>
        {max && (
          <progress
            className={`progress w-full ${getProgressColor(amount, max)}`}
            value={amount}
            max={max}
          ></progress>
        )}
        {!hideButtons && (
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary btn-outline"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </button>
            <button
              className="btn btn-secondary btn-outline"
              onClick={onViewExpensesClick}
            >
              View Expenses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}