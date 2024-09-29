import React from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../../utils";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null;

  const percentSpent = (amount / max) * 100;
  const isOverBudget = amount > max;

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Total Budget</CardTitle>
        <CardDescription>
          Overall spending across all categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <span className="text-2xl font-bold">{currencyFormatter.format(amount)}</span>
          <span className="text-right">
            <span className="text-sm text-muted-foreground">of </span>
            <span className="text-2xl font-bold">{currencyFormatter.format(max)}</span>
          </span>
        </div>
        <Progress value={percentSpent} className="h-2" />
      </CardContent>
      <CardFooter className="flex items-center gap-2">
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
            {percentSpent.toFixed(0)}% of total budget spent
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}