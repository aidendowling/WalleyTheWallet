import React from 'react';
import { RocketIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialChallenges = ({ challenges, completeChallenge }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Financial Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map(challenge => (
            <Alert 
              key={challenge.id}
              className={`transition-all duration-300 ${
                challenge.isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100 cursor-pointer'
              }`}
              onClick={() => !challenge.isCompleted && completeChallenge(challenge.id)}
            >
              {challenge.isCompleted ? (
                <RocketIcon className="h-4 w-4 text-green-500" />
              ) : (
                <CheckCircle2Icon className="h-4 w-4 text-blue-500" />
              )}
              <AlertTitle className={challenge.isCompleted ? 'text-green-700' : 'text-blue-700'}>
                {challenge.isCompleted ? 'Challenge Completed!' : 'Active Challenge'}
              </AlertTitle>
              <AlertDescription className={challenge.isCompleted ? 'text-green-600' : 'text-blue-600'}>
                {challenge.description}
              </AlertDescription>
              
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialChallenges;