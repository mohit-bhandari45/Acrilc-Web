'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  newsletter: boolean;
}

interface Event {
  date: string;
  title: string;
  description: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const events: Event[] = [
    {
      date: 'May 15–20, 2023',
      title: 'Portland Ceramic Arts Festival',
      description: 'Booth #42, Portland Convention Center',
    },
    {
      date: 'June 8, 2023',
      title: 'Studio Workshop: Glazing Techniques',
      description: 'Limited spots available',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      newsletter: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
      newsletter: false,
    });
    
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen flex items-center justify-center py-20 px-10 bg-white"
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 font-serif">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Have questions about my work or interested in commissioning a custom piece? 
                I&apos;d love to hear from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-black focus:ring-black rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-black focus:ring-black rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-900">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-black focus:ring-black rounded-md resize-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={handleCheckboxChange}
                  className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
                <Label 
                  htmlFor="newsletter" 
                  className="text-sm text-gray-700 font-normal leading-relaxed"
                >
                  Subscribe to my newsletter for updates on new work and exhibitions
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            <p className="text-xs text-gray-500 mt-6">
              This is a sample contact form. In a real implementation, form submissions would be processed securely.
            </p>
          </div>

          {/* Right: Info Card */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-50 border-gray-200 shadow-sm">
              <CardContent className="p-8 space-y-8">
                {/* Connect Section */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Connect</h3>
                  <div className="flex space-x-3">
                    <Link
                      href="https://www.instagram.com/theacrilc?igsh=NjRndzAydDdqcnF0"
                      target='_blank' 
                      className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
                      aria-label="Instagram"
                    >
                      <Instagram size={16} className="text-gray-700" />
                    </Link>
                    <Link
                      href="https://www.facebook.com/share/16CThH4ZMU/"
                      target='_blank' 
                      className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
                      aria-label="Facebook"
                    >
                      <Facebook size={16} className="text-gray-700" />
                    </Link>
                    <Link
                      href="#"
                      className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
                      aria-label="Twitter"
                    >
                      <Twitter size={16} className="text-gray-700" />
                    </Link>
                  </div>
                </div>

                {/* Visit Section */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-gray-900">Visit</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Portland Ceramic Studio<br />
                      2145 NW Everett St, Portland, OR 97210
                    </p>
                    <p className="text-xs text-gray-500">
                      Open for studio visits by appointment only
                    </p>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Upcoming Events</h3>
                  <div className="space-y-3">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-amber-600">
                            {event.date}
                          </p>
                          <h4 className="text-sm font-semibold text-gray-900">
                            {event.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;