import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold">Walley the Wallet</Link>
        <div className="space-x-4">
          <Link to="/home" className="hover:text-gray-300">Home</Link>
          <Link to="/app" className="hover:text-gray-300">App</Link>
          <Button> Sign In</Button>
          <Button>Register</Button>
        </div>
      </div>
    </nav>
  );
}