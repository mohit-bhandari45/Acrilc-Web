"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { FaPinterest } from 'react-icons/fa';

const Footer: FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Exclusive */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Exclusive</h3>
            <div className="space-y-2">
              <p>Subscribe</p>
              
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent border-gray-600 rounded-r-none focus:ring-0"
                />
                <Button 
                  variant="outline" 
                  className="bg-transparent border-gray-600 border-l-0 rounded-l-none hover:bg-gray-800"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Support</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                Dehradun,<br />
                Uttarakhand
              </p>
              <p>connectacrilc@gmail.com</p>
              <p>+918910879169</p>
              <p>+918509517177</p>
            </div>
          </div>

          {/* Column 3: Account */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Account</h3>
            <div className="space-y-2">
              <Link href="/account" className="block hover:text-gray-300">My Account</Link>
              <Link href="/cart" className="block hover:text-gray-300">Marketplace</Link>
              <Link href="/explore" className="block hover:text-gray-300">Explore</Link>
            </div>
          </div>

          {/* Column 4: Quick Link */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick Link</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block hover:text-gray-300">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-gray-300">Terms Of Use</Link>
              <Link href="/faq" className="block hover:text-gray-300">FAQ</Link>
              <Link href="/contact" className="block hover:text-gray-300">Contact</Link>
            </div>
          </div>
        </div>
        
        {/* Download App Section */}
        {/* <div className="mt-12 lg:mt-0 lg:absolute lg:right-8 lg:top-1/2 lg:transform lg:-translate-y-1/2">
          <h3 className="text-xl font-semibold mb-4">Download App</h3>
          <p className="text-sm text-gray-300 mb-4">Save 30% with App New User Only</p>
          
          <div className="flex flex-col items-start gap-4">
            <div className="relative w-32 h-32">
              <Image 
                src="/assets/profileassets/qr.png" 
                alt="QR Code"
                layout="fill" 
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/128/128";
                }}
              />
            </div>
            
            <div className="flex gap-2">
              <Link href="https://play.google.com/store" className="block">
                <Image 
                  src="/assets/profileassets/qr.png" 
                  alt="Google Play" 
                  width={120} 
                  height={40}
                  className="object-contain" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/120/40";
                  }}
                />
              </Link>
              <Link href="https://apps.apple.com" className="block">
                <Image 
                  src="/assets/profileassets/qr.png" 
                  alt="App Store" 
                  width={120} 
                  height={40}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/120/40";
                  }}
                />
              </Link>
            </div>
          </div>
        </div> */}
        
        {/* Social Media Icons */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex justify-center md:justify-start gap-6">
          <Link href="https://facebook.com" target='_blank' className="hover:text-gray-300">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://pin.it/2LBlIjfr6" target='_blank' className="hover:text-gray-300">
            <FaPinterest className="h-5 w-5" />
          </Link>
          <Link href=" https://www.instagram.com/theacrilc?igsh=NjRndzAydDdqcnF0" target='_blank' className="hover:text-gray-300">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://www.linkedin.com/company/acrilc/" target='_blank' className="hover:text-gray-300">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;