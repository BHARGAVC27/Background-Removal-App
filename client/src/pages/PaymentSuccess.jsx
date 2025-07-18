import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import { assets } from '../../assets/assets';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loadCreditsData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const transactionId = searchParams.get('transaction');
  const creditsAdded = searchParams.get('credits');

  useEffect(() => {
    // Reload credits data after successful payment
    const reloadData = async () => {
      await loadCreditsData();
      setIsLoading(false);
    };
    
    reloadData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. Credits have been added to your account.
        </p>

        {/* Payment Details */}
        {creditsAdded && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={assets.credit_icon} alt="Credits" className="w-5 h-5" />
              <span className="font-semibold text-lg">+{creditsAdded} Credits</span>
            </div>
            {transactionId && (
              <p className="text-sm text-gray-500">
                Transaction ID: {transactionId}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Start Removing Backgrounds
          </button>
          <button
            onClick={() => navigate('/buy-credit')}
            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
          >
            Buy More Credits
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-6">
          Thank you for choosing our service!
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
