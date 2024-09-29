import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#f4b4c4] py-6">
      <div className="container mx-auto px-5">
        <div className="mb-6">
          <p className="font-bold mb-2">Contact Us!</p>
          <p>+1 434-530-768</p>
          <p><a href="mailto:walleymail@hex.com" className="hover:underline">walleymail@hex.com</a></p>
        </div>
        
        <div>
          <p className="font-bold mb-2">Extra Resources:</p>
          <ul className="space-y-1">
            <li><a href="https://studentaid.gov/" className="hover:underline">FAFSA</a></li>
            <li><a href="https://studentaid.gov/resources/prepare-for-college/students/budgeting/budgeting-tips" className="hover:underline">Top College Budgeting Tips</a></li>
            <li><a href="https://www.bankrate.com/investing/passive-income-ideas/" className="hover:underline">Passive Income Tips & Tricks</a></li>
            <li><a href="https://www.samhsa.gov/" className="hover:underline">Mental Health Resource</a></li>
            <li><a href="https://www.investopedia.com/financial-term-dictionary-4769738" className="hover:underline">Finance Definitions</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}