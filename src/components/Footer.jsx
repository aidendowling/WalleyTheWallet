import React from 'react';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <>
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
    <footer className="bg-[#f4b4c4] py-8">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row md:space-x-12">
          <div className="mb-6 md:mb-0">
            <h2 className="font-bold text-lg mb-4">Contact Us</h2>
            <p className="mb-2">+1 434-530-768</p>
            <a href="mailto:walleymail@hex.com" className="font-light underline underline-offset-2 hover:font-normal">walleymail@hex.com</a>
          </div>
          
          <div>
            <h2 className="font-bold text-lg mb-4">Extra Resources</h2>
            <ul className="space-y-2">
              <li><a href="https://studentaid.gov/" className="font-light underline underline-offset-2 hover:font-normal">FAFSA</a></li>
              <li><a href="https://studentaid.gov/resources/prepare-for-college/students/budgeting/budgeting-tips" className="font-light underline underline-offset-2 hover:font-normal">Top College Budgeting Tips</a></li>
              <li><a href="https://www.bankrate.com/investing/passive-income-ideas/" className="font-light underline underline-offset-2 hover:font-normal">Passive Income Tips & Tricks</a></li>
              <li><a href="https://www.samhsa.gov/" className="font-light underline underline-offset-2 hover:font-normal">Mental Health Resource</a></li>
              <li><a href="https://www.investopedia.com/financial-term-dictionary-4769738" className="font-light underline underline-offset-2 hover:font-normal">Finance Definitions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}