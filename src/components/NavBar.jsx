import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="bg-white text-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Wallet size={24} />
          <Link to="/home" className="text-xl font-bold">Walley</Link>
        </div>
        <div className="space-x-2 flex items-center">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">Expenses</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">Loans</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">Budgets</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">Income</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">Savings</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">Checkings</Button>
          <Button variant="outline">Sign In</Button>
          <Button>Register</Button>
        </div>
      </div>
    </nav>
  );
}