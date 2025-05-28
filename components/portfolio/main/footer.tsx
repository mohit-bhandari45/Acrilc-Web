import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-10 py-15">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 mb-10">
          {/* About Section */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium mb-5">About Acrilc</h4>
              <p className="text-gray-300 mb-5 leading-relaxed">
                A platform connecting artists with collectors, celebrating the beauty of handmade crafts and contemporary art.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-5">Connect with us</h4>
              <div className="flex gap-4">
                <Link 
                  href="https://www.facebook.com/share/16CThH4ZMU/" 
                  target='_blank' 
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </Link>
                <Link 
                  href="#" 
                  target='_blank' 
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </Link>
                <Link 
                  href="https://www.instagram.com/theacrilc?igsh=NjRndzAydDdqcnF0"
                  target='_blank' 
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </Link>
                <Link 
                  href="#"
                  target='_blank' 
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Explore Section */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-5">Explore</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Featured Artists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-5">Join</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Become an Artist
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Marketplace Section */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-medium mb-5">Marketplace</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-5">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-10 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            &copy; 2025 Acrilc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;