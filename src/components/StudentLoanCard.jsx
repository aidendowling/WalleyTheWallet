import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { currencyFormatter } from "../../utils";

export default function StudentLoanCard({ loan }) {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [projectionData, setProjectionData] = useState([]);

  useEffect(() => {
    calculateProjection();
  }, [loan, paymentAmount]);

  const calculateProjection = () => {
    let balance = loan.amount;
    let data = [];
    const monthlyInterestRate = loan.interestRate / 12 / 100;
    const graduationDate = new Date(loan.graduationDate);
    const currentDate = new Date();
    const monthsUntilGraduation = (graduationDate.getFullYear() - currentDate.getFullYear()) * 12 + (graduationDate.getMonth() - currentDate.getMonth());

    for (let month = 0; month <= monthsUntilGraduation + 120; month++) {
      if (month > monthsUntilGraduation || !loan.isSubsidized) {
        balance += balance * monthlyInterestRate;
      }

      if (month >= monthsUntilGraduation) {
        balance -= paymentAmount;
      }

      if (balance < 0) balance = 0;

      data.push({
        month,
        balance: balance.toFixed(2),
      });

      if (balance === 0) break;
    }

    setProjectionData(data);
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{loan.name}</h2>
        <p>Loan Amount: {currencyFormatter.format(loan.amount)}</p>
        <p>Interest Rate: {loan.interestRate}%</p>
        <p>Graduation Date: {new Date(loan.graduationDate).toLocaleDateString()}</p>
        <p>Subsidized: {loan.isSubsidized ? 'Yes' : 'No'}</p>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Monthly Payment</span>
          </label>
          <input
            type="number"
            placeholder="Enter monthly payment"
            className="input input-bordered w-full max-w-xs"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
            min={0}
            step={0.01}
          />
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
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
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => currencyFormatter.format(value)} />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4">
          <p>Total Payments: {currencyFormatter.format(paymentAmount * projectionData.length)}</p>
          <p>Time to Repay: {projectionData.length} months ({(projectionData.length / 12).toFixed(1)} years)</p>
        </div>
      </div>
    </div>
  );
}