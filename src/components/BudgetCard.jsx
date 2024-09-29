import React from 'react';
import { TrendingUp, TrendingDown, Plus, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
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
  const isOverBudget = amount > max;
  const percentSpent = max ? (amount / max) * 100 : 0;

  const getProgressColor = (percent) => {
    if (percent < 50) return "bg-green-500";
    if (percent < 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className={`w-full ${gray ? "bg-muted" : ""} ${isOverBudget ? "border-red-500" : ""}`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{name}</span>
          <span className="text-right">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-sm text-muted-foreground ml-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {max && (
          <Progress 
            value={percentSpent} 
            className={`h-2 ${getProgressColor(percentSpent)}`} 
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2">
            {isOverBudget ? (
              <TrendingUp className="h-5 w-5 text-red-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium">
              {isOverBudget
                ? `Overspent by ${currencyFormatter.format(amount - max)}`
                : `${currencyFormatter.format(max - amount)} remaining`}
            </p>
            <p className="text-sm text-muted-foreground">
              {percentSpent.toFixed(0)}% of budget spent
            </p>
          </div>
        </div>
        {!hideButtons && (
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={onAddExpenseClick}>
              <Plus className="mr-2 h-4 w-4" /> Add Expense
            </Button>
            <Button variant="outline" onClick={onViewExpensesClick}>
              <Eye className="mr-2 h-4 w-4" /> View Expenses
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}