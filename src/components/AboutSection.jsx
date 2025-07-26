import React from "react";


const AboutSection = () => {
  return (
    
    <div className="min-h-screen py-16 px-4 md:px-16 ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-700 dark:text-red-600">
          About Pon Traders
        </h1>

        <p className="text-lg  leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-red-600 dark:text-red-600">Pon Traders</span>, the official distributor of <span className="font-bold text-red-700 dark:text-red-600">IPOL</span> brand lubricants and battery products in your region.
          With over a decade of experience in the distribution business, we take pride in delivering genuine, high-quality automotive solutions to workshops, retailers, and customers across the region.
        </p>

        <p className="text-lg  leading-relaxed mb-6">
          As an authorized distributor of IPOL, we maintain an extensive stock of engine oils, gear oils, greases, coolants, and automotive batteries. Our commitment is to ensure timely supply, technical support, and trust in every delivery. 
        </p>

        <p className="text-lg leading-relaxed mb-6">
          At Pon Traders, our mission is not just to supply lubricants — it’s to power vehicles and machinery with reliable products that extend performance and life. We work closely with service centers, dealers, and industries to understand their unique needs and deliver the best possible solutions.
        </p>

        <p className="text-lg  leading-relaxed mb-10">
          Thank you for choosing Pon Traders. We look forward to serving your needs with integrity, speed, and unmatched quality.
        </p>

        {/* Testimonials Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-600 text-center mb-6">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className=" shadow-md rounded-xl p-6">
              <p className=" italic mb-4">
                “Pon Traders has been our go-to distributor for over 5 years. Their reliability, support, and product quality are unmatched. Highly recommended!”
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-300 dark:bg-red-700 text-white flex items-center justify-center font-bold">
                  A
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Arun M.</p>
                  <p className="text-sm">Owner, RM Auto Care</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className=" shadow-md rounded-xl p-6">
              <p className=" italic mb-4">
                “Their commitment to distributing only genuine IPOL oils and batteries makes them stand out. Their service is top-notch. Highly recommended!”
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-400 dark:bg-red-700 text-white flex items-center justify-center font-bold">
                  S
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Sujatha R.</p>
                  <p className="text-sm ">Manager, Speed Lube Center</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Message */}
        <div className="mt-16 text-center text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Pon Traders. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

