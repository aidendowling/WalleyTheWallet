import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../../utils"

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
  const expenses = getBudgetExpenses(budgetId)
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId)

  return (
    <dialog id="view_expenses_modal" className={`modal ${budgetId != null ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 flex justify-between items-center">
          <span>Expenses - {budget?.name}</span>
          {budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <button
              onClick={() => {
                deleteBudget(budget)
                handleClose()
              }}
              className="btn btn-sm btn-outline btn-error"
            >
              Delete
            </button>
          )}
        </h3>
        <div className="space-y-3">
          {expenses.map(expense => (
            <div key={expense.id} className="flex justify-between items-center">
              <span className="text-lg">{expense.description}</span>
              <div className="flex items-center space-x-2">
                <span className="text-base">
                  {currencyFormatter.format(expense.amount)}
                </span>
                <button
                  onClick={() => deleteExpense(expense)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-action">
          <button className="btn" onClick={handleClose}>Close</button>
        </div>
      </div>
    </dialog>
  )
}