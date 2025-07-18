import express from 'express';
import { 
  createPaymentSession, 
  processPayment, 
  getPaymentPlans, 
  verifyPayment 
} from '../controllers/paymentController.js';
import authUser from '../middlewares/auth.js';

const paymentRouter = express.Router();

// Get available payment plans
paymentRouter.get('/plans', getPaymentPlans);

// Create payment session (protected route)
paymentRouter.post('/create-session', authUser, createPaymentSession);

// Process payment (protected route)
paymentRouter.post('/process', authUser, processPayment);

// Verify payment status
paymentRouter.get('/verify/:sessionId', authUser, verifyPayment);

export default paymentRouter;
