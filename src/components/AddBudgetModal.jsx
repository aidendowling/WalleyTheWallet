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
import { useBudgets } from "../contexts/BudgetsContext";

function AddBudgetModal({ showModal, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();
  const { toast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    toast({
      title: "Budget Added",
      description: `New budget "${nameRef.current.value}" has been added.`,
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
          <CardTitle>New Budget</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  ref={nameRef}
                  placeholder="Enter budget name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="max">Maximum Spending</Label>
                <Input
                  id="max"
                  ref={maxRef}
                  type="number"
                  step="0.01"
                  placeholder="Enter maximum amount"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Budget</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default AddBudgetModal;