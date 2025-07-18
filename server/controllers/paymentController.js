// Dummy Payment Gateway Controller
import userModel from "../models/userModel.js";

// Dummy payment plans
const PAYMENT_PLANS = {
  basic: { credits: 10, price: 5.99, name: "Basic Plan" },
  standard: { credits: 50, price: 19.99, name: "Standard Plan" },
  premium: { credits: 100, price: 34.99, name: "Premium Plan" }
};

// Create dummy payment session
const createPaymentSession = async (req, res) => {
  try {
    const { clerkId, plan } = req.body;
    
    if (!PAYMENT_PLANS[plan]) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid payment plan" 
      });
    }

    // Find user
    const userData = await userModel.findOne({ clerkId });
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found" 
      });
    }

    const planDetails = PAYMENT_PLANS[plan];
    
    // Generate dummy session ID
    const sessionId = `dummy_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`Creating payment session for user ${clerkId}, plan: ${plan}`);
    
    res.json({
      success: true,
      sessionId,
      plan: planDetails,
      redirectUrl: `${process.env.FRONTEND_URL}/payment?session=${sessionId}&plan=${plan}`
    });

  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to create payment session" 
    });
  }
};

// Process dummy payment
const processPayment = async (req, res) => {
  try {
    const { sessionId, plan, paymentMethod } = req.body;
    
    if (!sessionId || !plan || !PAYMENT_PLANS[plan]) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid payment data" 
      });
    }

    // Extract clerkId from session (in real implementation, this would be stored)
    const clerkId = req.body.clerkId;
    
    // Find user
    const userData = await userModel.findOne({ clerkId });
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found" 
      });
    }

    const planDetails = PAYMENT_PLANS[plan];
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      // Add credits to user account
      const newCreditBalance = userData.creditBalance + planDetails.credits;
      
      await userModel.updateOne(
        { clerkId },
        { creditBalance: newCreditBalance }
      );
      
      console.log(`Payment successful for user ${clerkId}. Added ${planDetails.credits} credits. New balance: ${newCreditBalance}`);
      
      res.json({
        success: true,
        message: "Payment processed successfully!",
        creditsAdded: planDetails.credits,
        newBalance: newCreditBalance,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      });
    } else {
      // Simulate payment failure
      res.status(400).json({
        success: false,
        error: "Payment failed. Please try again with a different payment method."
      });
    }

  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ 
      success: false, 
      error: "Payment processing failed" 
    });
  }
};

// Get payment plans
const getPaymentPlans = async (req, res) => {
  try {
    res.json({
      success: true,
      plans: PAYMENT_PLANS
    });
  } catch (error) {
    console.error("Error fetching payment plans:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch payment plans" 
    });
  }
};

// Verify payment status (for checking completed payments)
const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // In a real implementation, you'd check the payment status from the payment provider
    // For dummy gateway, we'll just return success
    res.json({
      success: true,
      status: "completed",
      sessionId
    });
    
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to verify payment" 
    });
  }
};

export { 
  createPaymentSession, 
  processPayment, 
  getPaymentPlans, 
  verifyPayment 
};
