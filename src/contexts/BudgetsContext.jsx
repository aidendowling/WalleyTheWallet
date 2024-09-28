import React, { useContext } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", [])
  const [expenses, setExpenses] = useLocalStorage("expenses", [])

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses(prevExpenses => [
      ...prevExpenses,
      { id: uuidV4(), description, amount, budgetId }
    ])
  }

  const addBudget = ({ name, max }) => {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }

  const deleteBudget = ({ id }) => {
    setExpenses(prevExpenses => 
      prevExpenses.map(expense => 
        expense.budgetId !== id ? expense : { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      )
    )
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id))
  }

  const deleteExpense = ({ id }) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id))
  }

  const contextValue = {
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteBudget,
    deleteExpense,
  }

  return (
    <BudgetsContext.Provider value={contextValue}>
      {children}
    </BudgetsContext.Provider>
  )
}