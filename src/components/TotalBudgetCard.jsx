import { useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets()
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0)

  if (max === 0) return null

  return (
    <div className="mt-4">
      <BudgetCard
        amount={amount}
        name="Total"
        gray
        max={max}
        hideButtons
        className="bg-base-200" // DaisyUI background class for slight emphasis
      />
    </div>
  )
}