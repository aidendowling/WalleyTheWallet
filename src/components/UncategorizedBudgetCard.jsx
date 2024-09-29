import React from 'react';
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return (
    <Card className="w-full mt-4 bg-yellow-50 border-l-4 border-yellow-500">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
            Uncategorized
          </span>
          <span>{currencyFormatter.format(amount)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={100} className="h-2 bg-yellow-200" />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Expenses without a specific budget category
        </p>
        {props.onAddExpenseClick && (
          <Button variant="outline" onClick={props.onAddExpenseClick}>
            Add Expense
          </Button>
        )}
        {props.onViewExpensesClick && (
          <Button variant="outline" onClick={props.onViewExpensesClick}>
            View Expenses
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}