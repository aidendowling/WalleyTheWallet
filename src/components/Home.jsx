import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Info } from 'lucide-react';
// Import the images
import emptyWallet from '../assets/empty.png';
import wallet20 from '../assets/20.png';
import wallet40 from '../assets/40.png';
import wallet80 from '../assets/80.png';
import fullWallet from '../assets/full.png';

export default function Home() {
  const walletImages = [emptyWallet, wallet20, wallet40, wallet80, fullWallet];
  
  const financeFactors = [
    { title: "Expenses", description: "The amount of money you spend on the day-to-day (divided by month) and regular bills (utilities, subscriptions...)." },
    { title: "Budgets", description: "Tie to spend, ide you would general categories (food, cleaning supplies...)." },
    { title: "Loans", description: "A borrowed sum of money that is paid back using interest. Most college students struggle to pay these back." },
    { title: "Income", description: "The amount of money you make throughout a specific time period due to an established job, side hustle, ..." },
    { title: "Savings", description: "The amount of money you have made and stored for short or long term goals. This is not to be used on a day to day basis." },
    { title: "Checkings", description: "Day to day spending and liquid funds, make sure you can cover any unexpected expenses." },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <NavBar />
      <main className="flex-grow pb-8">
        <div className="bg-[#f4b4c4] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Walley the Wallet</h1>
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
        
        <div className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center space-x-4">
              {walletImages.map((img, index) => (
                <img key={index} src={img} alt={`Wallet ${index}`} className="h-16 w-auto" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 py-8 border-t border-b border-black">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl font-semibold mb-2">Track. Maintain. Revive.</p>
            <p className="text-xl">Keeping yourself and your wallet happy!</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-2xl font-bold mb-6">College Financing: 6 Key Factors to Consider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeFactors.map((factor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg font-bold text-black">
                    <Info className="mr-2" size={24} />
                    {factor.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}