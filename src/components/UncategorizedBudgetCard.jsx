import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  )

  if (amount === 0) return null

  return (
    <div className="mt-4">
      <BudgetCard
        amount={amount}
        name="Uncategorized"
        className="bg-base-200 border-l-4 border-warning"
        {...props}
      />
    </div>
  )
}