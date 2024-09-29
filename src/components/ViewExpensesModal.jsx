import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
  const { toast } = useToast();
  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId);

  const handleDeleteBudget = () => {
    deleteBudget(budget);
    toast({
      title: "Budget Deleted",
      description: `The budget "${budget.name}" has been deleted.`,
      variant: "default",
    });
    handleClose();
  };

  const handleDeleteExpense = (expense) => {
    deleteExpense(expense);
    toast({
      title: "Expense Deleted",
      description: `The expense "${expense.description}" has been deleted.`,
      variant: "default",
    });
  };

  if (budgetId == null) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-[90%] max-w-[600px] max-h-[80vh] overflow-y-auto relative">
        <Button
          className="absolute top-2 right-2 h-8 w-8 p-0"
          variant="ghost"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Expenses - {budget?.name}</CardTitle>
          {budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <Button
              onClick={handleDeleteBudget}
              variant="destructive"
              size="sm"
            >
              Delete Budget
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map(expense => (
              <div key={expense.id} className="flex justify-between items-center">
                <span className="text-lg">{expense.description}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-medium">
                    {currencyFormatter.format(expense.amount)}
                  </span>
                  <Button
                    onClick={() => handleDeleteExpense(expense)}
                    variant="destructive"
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleClose}>Close</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ViewExpensesModal;