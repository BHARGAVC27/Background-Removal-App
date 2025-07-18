import React, { useState, useContext } from 'react'
import { assets, plans } from "../../assets/assets";
import { AppContext } from '../context/appContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredit = () => {
  const { backendURL, loadCreditsData } = useContext(AppContext);
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  // Handle payment
  const handlePayment = async (planId) => {
    if (!user) {
      toast.error('Please sign in to purchase credits');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      
      // Create payment session
      const { data: sessionData } = await axios.post(
        `${backendURL}/api/payment/create-session`,
        {
          clerkId: user.id,
          plan: planId
        },
        {
          headers: { token }
        }
      );

      if (sessionData.success) {
        // Show payment modal/form
        showPaymentForm(sessionData.sessionId, planId, sessionData.plan);
      } else {
        toast.error(sessionData.error || 'Failed to create payment session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  const showPaymentForm = (sessionId, planId, planDetails) => {
    const paymentForm = document.createElement('div');
    paymentForm.innerHTML = `
      <div id="payment-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg max-w-md w-full mx-4">
          <h3 class="text-xl font-bold mb-4">Complete Payment</h3>
          <div class="mb-4">
            <p class="text-gray-600">Plan: <strong>${planDetails.name}</strong></p>
            <p class="text-gray-600">Credits: <strong>${planDetails.credits}</strong></p>
            <p class="text-gray-600">Amount: <strong>$${planDetails.price}</strong></p>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Payment Method</label>
            <select id="payment-method" class="w-full p-2 border rounded">
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" value="4111 1111 1111 1111" class="w-full p-2 border rounded">
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium mb-2">Expiry</label>
              <input type="text" placeholder="MM/YY" value="12/25" class="w-full p-2 border rounded">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">CVV</label>
              <input type="text" placeholder="123" value="123" class="w-full p-2 border rounded">
            </div>
          </div>

          <div class="flex gap-4">
            <button id="process-payment" class="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor">
              Pay $${planDetails.price}
            </button>
            <button id="cancel-payment" class="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(paymentForm);

    // Handle payment processing
    document.getElementById('process-payment').onclick = () => processPayment(sessionId, planId);
    document.getElementById('cancel-payment').onclick = () => document.body.removeChild(paymentForm);
  };

  // Process the payment
  const processPayment = async (sessionId, planId) => {
    try {
      const paymentMethod = document.getElementById('payment-method').value;
      const token = await getToken();
      
      const { data } = await axios.post(
        `${backendURL}/api/payment/process`,
        {
          sessionId,
          plan: planId,
          paymentMethod,
          clerkId: user.id
        },
        {
          headers: { token }
        }
      );

      // Remove modal
      const modal = document.getElementById('payment-modal');
      if (modal) {
        modal.remove();
      }

      if (data.success) {
        toast.success(`Payment successful! ${data.creditsAdded} credits added to your account.`);
        loadCreditsData(); // Refresh credits
        
        // Redirect to success page with transaction details
        navigate(`/payment-success?transaction=${data.transactionId}&credits=${data.creditsAdded}`);
      } else {
        toast.error(data.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Payment failed. Please try again.');
      
      // Remove modal on error
      const modal = document.getElementById('payment-modal');
      if (modal) {
        modal.remove();
      }
    }
  };
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
              <button 
                onClick={() => handlePayment(plan.id)}
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-yellow-900 hover:from-blue-600 hover:to-yellow-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Purchase $${plan.price}`}
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
