'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow when page scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-extrabold font-heading text-gray-950 tracking-tight flex items-center"
            >
              BuatCV<span className="text-primary-600">.id</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/templates"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Template
            </Link>
            <Link
              href="/tips"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Tips & Panduan
            </Link>
            <Link
              href="/builder"
              className="no-underline"
            >
              <Button
                variant="primary"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Mulai Buat CV
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
              aria-expanded={isOpen}
              aria-label="Toggle menu utama"
            >
              {isOpen ? <X className="h-6 h-6" /> : <Menu className="h-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-64 opacity-100 shadow-lg' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <Link
            href="/templates"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary-600 transition-colors"
          >
            Template
          </Link>
          <Link
            href="/tips"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary-600 transition-colors"
          >
            Tips & Panduan
          </Link>
          <div className="px-3 pt-2">
            <Link
              href="/builder"
              onClick={() => setIsOpen(false)}
              className="block w-full no-underline"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Mulai Buat CV
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
