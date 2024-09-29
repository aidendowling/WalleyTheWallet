import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X, ChevronDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
  const { toast } = useToast();
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    if (budgetId != null) {
      setExpenses(getBudgetExpenses(budgetId));
    }
  }, [budgetId, getBudgetExpenses]);

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
    setExpenses(getBudgetExpenses(budgetId));
    toast({
      title: "Expense Deleted",
      description: `The expense "${expense.description}" has been deleted.`,
      variant: "default",
    });
  };

  if (budgetId == null) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-[90%] max-w-[800px] max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Expenses - {budget?.name}</CardTitle>
          <div className="flex space-x-2">
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={handleDeleteBudget}
                variant="destructive"
                size="sm"
              >
                Delete Budget
              </Button>
            )}
            <Button
              className="h-8 w-8 p-0"
              variant="ghost"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="text-right">
                    {currencyFormatter.format(expense.amount)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleDeleteExpense(expense)}>
                          Delete Expense
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleClose}>Close</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ViewExpensesModal;