import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Walley the Wallet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Expenses</CardTitle>
              <CardDescription>Keep your finances under control</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Easily log and categorize your expenses to understand your spending habits.</p>
              <Button className="mt-4">Start Tracking</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Set Budgets</CardTitle>
              <CardDescription>Stay within your financial limits</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create custom budgets for different categories and monitor your progress.</p>
              <Button className="mt-4">Create Budget</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}