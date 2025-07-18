import React from 'react'
import { assets, plans } from "../../assets/assets";

const BuyCredit = () => {
  return (
    <div className='min-h-screen text-center pt-14 mb-10 px-4 lg:px-44'>
      {/* Header Section */}
      <div className="mb-16">
        <div className="inline-block px-6 py-2 bg-gray-100 rounded-full mb-6">
          <span className="text-gray-600 font-medium text-sm">OUR PLANS</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-700 mb-4 leading-tight">
          Choose the plan that's right for you
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Get started with our flexible pricing plans designed for individuals, businesses, and enterprises
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div key={plan.id} className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            {/* Accent Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-yellow-900 rounded-t-2xl"></div>
            
            {/* Plan Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-yellow-900 rounded-full flex items-center justify-center">
                <img src={assets.logo_icon} alt="Plan icon" className="w-8 h-8 filter brightness-0 invert" />
              </div>
            </div>

            {/* Plan Details */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral-700 mb-2">{plan.id}</h3>
              <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
              
              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-700">${plan.price}</span>
                <div className="text-gray-500 text-sm mt-1">
                  {plan.credits.toLocaleString()} credits
                </div>
              </div>
            </div>

            {/* Features - flex-grow to push button to bottom */}
            <div className="mb-8 text-left flex-grow">
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
                  {plan.credits.toLocaleString()} background removals
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
                  High quality processing
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
                  Download in multiple formats
                </li>
                {index > 0 && (
                  <li className="flex items-center text-gray-600">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
                    Priority processing
                  </li>
                )}
                {index > 1 && (
                  <li className="flex items-center text-gray-600">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mr-3">✓</span>
                    API access
                  </li>
                )}
              </ul>
            </div>

            {/* CTA Button - positioned at bottom */}
            <div className="mt-auto">
              <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-yellow-900 hover:from-blue-600 hover:to-yellow-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                {index === 0 ? 'Get started' : index === 1 ? 'Get started' : 'Purchase'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          All plans include our standard support. Need something custom? 
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer ml-1">Contact us</span>
        </p>
      </div>
    </div>
  )
}

export default BuyCredit
