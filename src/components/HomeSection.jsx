import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div >

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center px-4 bg-gradient-to-br">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold leading-tight">
            Official Distributor of <span className="text-primary">IPOL Lubricants</span>
          </h1>
          <p className="text-lg">
            <strong>Pon Traders</strong> is the trusted name in South India for distributing high-performance oils and greases from the renowned brand <strong>IPOL</strong>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="cosmic-button">
              Become a Dealer
            </Link>
            <Link to="/about" className="cosmic-button bg-white text-primary border border-primary hover:bg-primary hover:text-white">
              About Pon Traders
            </Link>
          </div>
        </div>
      </section>

      {/* IPOL Brand Highlight */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <img src="/assets/ipol-products.jpg" alt="IPOL Product Range" className="rounded-lg shadow-md" />
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-primary">Why IPOL?</h2>
            <p >
              <strong>IPOL</strong> is one of India’s most respected lubricant brands, trusted by industries and auto professionals for decades. With a focus on quality, performance, and innovation, IPOL delivers lubricants that perform in the harshest conditions — from highways to heavy industry.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>API-certified engine oils & greases</li>
              <li>Solutions for automotive, industrial & marine applications</li>
              <li>Tested and recommended by major OEMs</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
