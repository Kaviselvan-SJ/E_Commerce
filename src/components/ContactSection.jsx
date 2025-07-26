import React from 'react';


const ContactSection = () => {
  return (
    <div className="min-h-screen py-16 px-4 md:px-16 bg-gradient-to-br from-red-100 to-white dark:from-red-900 dark:to-neutral-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-700 dark:text-red-300 mb-8">
          Contact Us
        </h1>

        {/* Company Info */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
            Pon Traders – Official Distributor of IPOL
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            📍 <strong>Address:</strong> 123, Main Road, Industrial Estate, Coimbatore, Tamil Nadu - 641001
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            ☎️ <strong>Phone:</strong> +91 98765 43210
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            📧 <strong>Email:</strong> contact@pontraders.com
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            🕒 <strong>Business Hours:</strong> Mon - Sat, 9:00 AM to 7:00 PM
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-6">
            Send Us a Message
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Message</label>
              <textarea
                rows="5"
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400 text-sm">
          We usually respond within 1 business day.
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
