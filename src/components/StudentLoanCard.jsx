import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { currencyFormatter } from "../../utils";

export default function StudentLoanCard({ loan }) {
  const [paymentAmount1, setPaymentAmount1] = useState(0);
  const [paymentAmount2, setPaymentAmount2] = useState(0);
  const [projectionData, setProjectionData] = useState([]);

  useEffect(() => {
    calculateProjection();
  }, [loan, paymentAmount1, paymentAmount2]);

  const calculateProjection = () => {
    let balance1 = loan.amount;
    let balance2 = loan.amount;
    let data = [];
    const monthlyInterestRate = loan.interestRate / 12 / 100;
    const graduationDate = new Date(loan.graduationDate);
    const currentDate = new Date();
    const monthsUntilGraduation = (graduationDate.getFullYear() - currentDate.getFullYear()) * 12 + (graduationDate.getMonth() - currentDate.getMonth());

    for (let month = 0; month <= monthsUntilGraduation + 360; month++) {
      if (month > monthsUntilGraduation || !loan.isSubsidized) {
        balance1 += balance1 * monthlyInterestRate;
        balance2 += balance2 * monthlyInterestRate;
      }
      if (month >= monthsUntilGraduation) {
        balance1 -= paymentAmount1;
        balance2 -= paymentAmount2;
      }
      if (balance1 < 0) balance1 = 0;
      if (balance2 < 0) balance2 = 0;

      data.push({
        month,
        balance1: balance1.toFixed(2),
        balance2: balance2.toFixed(2),
      });

      if (balance1 === 0 && balance2 === 0) break;
    }
    setProjectionData(data);
  };

  const chartConfig = {
    balance1: {
      label: "Payment 1",
      color: "hsl(var(--chart-1))",
    },
    balance2: {
      label: "Payment 2",
      color: "hsl(var(--chart-2))",
    },
  };

  const getRepaymentTime = (balanceKey) => {
    const months = projectionData.findIndex(data => parseFloat(data[balanceKey]) === 0);
    return months > -1 ? months : projectionData.length;
  };

  const repaymentTime1 = getRepaymentTime('balance1');
  const repaymentTime2 = getRepaymentTime('balance2');
  const timeDifference = Math.abs(repaymentTime1 - repaymentTime2);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{loan.name}</CardTitle>
        <CardDescription>
          Loan Amount: {currencyFormatter.format(loan.amount)} | 
          Interest Rate: {loan.interestRate}% | 
          Graduation: {new Date(loan.graduationDate).toLocaleDateString()} | 
          Subsidized: {loan.isSubsidized ? 'Yes' : 'No'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="payment1">Monthly Payment 1</Label>
            <Input
              id="payment1"
              type="number"
              placeholder="Enter monthly payment"
              value={paymentAmount1}
              onChange={(e) => setPaymentAmount1(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
            />
          </div>
          <div>
            <Label htmlFor="payment2">Monthly Payment 2</Label>
            <Input
              id="payment2"
              type="number"
              placeholder="Enter monthly payment"
              value={paymentAmount2}
              onChange={(e) => setPaymentAmount2(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
            />
          </div>
        </div>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={projectionData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month"
                tickFormatter={(value) => `${Math.floor(value / 12)}y${value % 12}m`}
              />
              <YAxis 
                tickFormatter={(value) => currencyFormatter.format(value)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="balance1"
                stroke="var(--color-balance1)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="balance2"
                stroke="var(--color-balance2)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-6 w-full text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold">Payment 1</h4>
            <p>Monthly: {currencyFormatter.format(paymentAmount1)}</p>
            <p>Total: {currencyFormatter.format(paymentAmount1 * repaymentTime1)}</p>
            <p>Time to Repay: {repaymentTime1} months ({(repaymentTime1 / 12).toFixed(1)} years)</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Payment 2</h4>
            <p>Monthly: {currencyFormatter.format(paymentAmount2)}</p>
            <p>Total: {currencyFormatter.format(paymentAmount2 * repaymentTime2)}</p>
            <p>Time to Repay: {repaymentTime2} months ({(repaymentTime2 / 12).toFixed(1)} years)</p>
          </div>
        </div>
        <div className="flex w-full items-start gap-2 text-sm pt-4 border-t">
          <div className="flex items-center gap-2">
            {repaymentTime1 < repaymentTime2 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : repaymentTime2 < repaymentTime1 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-yellow-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium">
              {repaymentTime1 < repaymentTime2 ? (
                <>Payment 1 repays {timeDifference} months faster</>
              ) : repaymentTime2 < repaymentTime1 ? (
                <>Payment 2 repays {timeDifference} months faster</>
              ) : (
                <>Both payments have the same repayment time</>
              )}
            </p>
            <p className="text-muted-foreground">
              Comparing two payment strategies over the loan term
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}