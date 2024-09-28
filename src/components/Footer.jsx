import React from 'react';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
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
  );
}