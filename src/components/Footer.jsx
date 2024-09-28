import React from 'react';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main footer section */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 Walley the Wallet. All rights reserved.</p>
          <div className="space-x-4">
            <Twitter className="inline-block" size={24} />
            <Instagram className="inline-block" size={24} />
            <Youtube className="inline-block" size={24} />
            <Linkedin className="inline-block" size={24} />
          </div>
        </div>
      </footer>

      {/* Contact Us section */}
      <footer className="flex-grow">
        <div className="bg-white-800 py-3 mb-3 p-5">
        <div className="container mx-auto py-3 p=7">
        <p className="mb-2"><strong>Contact Us!</strong></p>
        <p> +1 434-530-768 </p>
        <p> <a href="walleymail@hex.com"> walleymail@hex.com </a></p>
            <div className="container mx-auto py-3">
              <p className="mb-2"><strong>Extra Resources:</strong></p>
          <p><a href="https://studentaid.gov/">FAFSA</a></p> 
          <p><a href="https://studentaid.gov/resources/prepare-for-college/students/budgeting/budgeting-tips">Top College Budgeting Tips</a></p> 
          <p><a href="https://www.bankrate.com/investing/passive-income-ideas/">Passive Income Tips & Tricks</a></p> 
          <p><a href="https://www.samhsa.gov/">Mental Health Resource</a></p> 
          <p><a href="https://www.investopedia.com/financial-term-dictionary-4769738">Finance Definitions</a></p> 
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
