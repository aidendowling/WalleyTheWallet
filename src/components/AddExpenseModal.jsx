import React, { useRef } from 'react';
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

function AddExpenseModal({ showModal, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef(defaultBudgetId);
  const { addExpense, budgets } = useBudgets();
  const { toast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current,
    });
    toast({
      title: "Expense Added",
      description: `New expense "${descriptionRef.current.value}" has been added.`,
      variant: "default",
    });
    handleClose();
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-[90%] max-w-[400px] relative">
        <Button
          className="absolute top-2 right-2 h-8 w-8 p-0"
          variant="ghost"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader>
          <CardTitle>New Expense</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  ref={descriptionRef}
                  placeholder="Enter expense description"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  ref={amountRef}
                  type="number"
                  placeholder="Enter amount"
                  required
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="budget">Budget</Label>
                <Select defaultValue={defaultBudgetId} onValueChange={(value) => budgetIdRef.current = value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</SelectItem>
                    {budgets.map(budget => (
                      <SelectItem key={budget.id} value={budget.id}>
                        {budget.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Expense</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default AddExpenseModal;