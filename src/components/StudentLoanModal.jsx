import React, { useRef, useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { useBudgets } from "../contexts/BudgetsContext";
import { Calendar } from "@/components/ui/calendar";

function StudentLoanModal({ showModal, handleClose, onAddStudentLoan }) {
  const nameRef = useRef();
  const amountRef = useRef();
  const interestRateRef = useRef();
  const [graduationDate, setGraduationDate] = useState(new Date());
  const [isSubsidized, setIsSubsidized] = useState(false);
  const { addExpense } = useBudgets();
  const { toast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    const studentLoan = {
      name: nameRef.current.value,
      amount: parseFloat(amountRef.current.value),
      interestRate: parseFloat(interestRateRef.current.value),
      graduationDate: graduationDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      isSubsidized: isSubsidized,
    };
    onAddStudentLoan(studentLoan);
    toast({
      title: "Student Loan Added",
      description: `New student loan "${studentLoan.name}" has been added.`,
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
          <CardTitle>New Student Loan</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Loan Name</Label>
                <Input
                  id="name"
                  ref={nameRef}
                  placeholder="Enter loan name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Loan Amount</Label>
                <Input
                  id="amount"
                  ref={amountRef}
                  type="number"
                  placeholder="Enter loan amount"
                  required
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  ref={interestRateRef}
                  type="number"
                  placeholder="Enter interest rate"
                  required
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Expected Graduation Date</Label>
                <Calendar
                  mode="single"
                  selected={graduationDate}
                  onSelect={(date) => setGraduationDate(date || new Date())}
                  className="rounded-md border shadow"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isSubsidized"
                  checked={isSubsidized}
                  onCheckedChange={setIsSubsidized}
                />
                <Label htmlFor="isSubsidized">Is this loan subsidized?</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Loan</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default StudentLoanModal;