import React, { useContext, useCallback, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  // Debugging function to log state changes
  const logState = useCallback(() => {
    console.log("Current State:", { budgets, expenses });
  }, [budgets, expenses]);

  // Log state changes
  useEffect(() => {
    logState();
  }, [budgets, expenses, logState]);

  const getBudgetExpenses = useCallback((budgetId) => {
    return expenses.filter(expense => expense.budgetId === budgetId);
  }, [expenses]);

  const addExpense = useCallback(({ description, amount, budgetId }) => {
    setExpenses(prevExpenses => {
      const newExpense = { id: uuidV4(), description, amount, budgetId };
      console.log("Adding expense:", newExpense);
      return [...prevExpenses, newExpense];
    });
  }, [setExpenses]);

  const addBudget = useCallback(({ name, max }) => {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        console.log("Budget already exists:", name);
        return prevBudgets;
      }
      const newBudget = { id: uuidV4(), name, max };
      console.log("Adding budget:", newBudget);
      return [...prevBudgets, newBudget];
    });
  }, [setBudgets]);

  const deleteBudget = useCallback(({ id }) => {
    console.log("Deleting budget:", id);
    setExpenses(prevExpenses => 
      prevExpenses.map(expense => {
        if (expense.budgetId === id) {
          console.log("Moving expense to Uncategorized:", expense);
          return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
        }
        return expense;
      })
    );
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
  }, [setExpenses, setBudgets]);

  const deleteExpense = useCallback(({ id }) => {
    console.log("Deleting expense:", id);
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }, [setExpenses]);

  // Dev console reset function
  const resetState = useCallback(() => {
    console.log("Resetting state to default values");
    setBudgets([]);
    setExpenses([]);
  }, [setBudgets, setExpenses]);

  // Attach reset function to window for easy access in browser console
  useEffect(() => {
    window.resetBudgetState = resetState;
    window.viewBudgetState = logState;
    return () => {
      delete window.resetBudgetState;
      delete window.viewBudgetState;
    };
  }, [resetState, logState]);

  const contextValue = {
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteBudget,
    deleteExpense,
    resetState,
    logState,
  };

  return (
    <BudgetsContext.Provider value={contextValue}>
      {children}
    </BudgetsContext.Provider>
  );
};