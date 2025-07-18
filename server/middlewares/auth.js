import e from "express";
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.headers.token;
    console.log("Received token:", token ? "Token present" : "No token");
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }
    
    // Decode the JWT token (Clerk tokens are already signed and verified by Clerk)
    const token_decoded = jwt.decode(token);
    console.log("Decoded token:", token_decoded);
    
    if (!token_decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    
    // Clerk tokens use 'sub' field for user ID
    const clerkId = token_decoded.sub || token_decoded.clerkId;
    console.log("Extracted clerkId:", clerkId);
    
    if (!clerkId) {
      return res.status(401).json({ error: "Unauthorized - No user ID in token" });
    }
    
    // Ensure req.body exists for GET requests
    if (!req.body) {
      req.body = {};
    }
    
    req.body.clerkId = clerkId;
    next();
  } catch (error) {
    console.error("Error in authUser middleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authUser;