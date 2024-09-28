import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <div className="bg-[#f4b4c4] py-12 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Walley the Wallet</h1>
            <p className="text-xl mb-6">Your finance companion</p>
            <div className="space-x-4">
              <Button asChild>
                <Link to="/app">Walley</Link>
              </Button>
              <Button asChild variant="outline" className="bg-gray-200 text-black border-gray-300 hover:bg-gray-300">
                <Link to="/app">Your Finances</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}