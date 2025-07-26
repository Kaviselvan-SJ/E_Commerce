import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-muted text-foreground py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-primary">Pontaders</h3>
          <p className="text-sm ">
            Official distributor of <strong>IPOL</strong> oils and batteries.
            Delivering performance and reliability across industries and vehicles.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-medium mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-medium mb-2">Contact Us</h4>
          <ul className="text-sm  space-y-2">
            <li className="flex justify-center items-center gap-2">
              <FaPhoneAlt className="text-primary" />
              +91 98765 43210
            </li>
            <li className="flex justify-center items-center gap-2">
              <FaEnvelope className="text-primary" />
              info@pontaders.in
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-medium mb-2">Follow Us</h4>
          <div className="flex justify-center items-center gap-4 text-primary text-xl ">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 text-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} Pontraders. All rights reserved. | Built with 💼 & ⚙️
      </div>
    </footer>
  );
};
