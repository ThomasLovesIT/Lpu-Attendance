import RateLimit from '../config/upstash.js';

const RateLimiter = async (req, res, next) => {
  try {
    const { success } = await RateLimit.limit(req.ip);
    
    if (!success) {
      return res.status(429).json({
        message: "TOO MANY REQUESTS - RATE LIMIT EXCEEDED"
      });
    }
    
    // If successful, continue to the next middleware
    next();
    
  } catch (error) {
    console.log("Rate Limiter Error:", error);
    // Pass error to Express error handler and STOP here
    return next(error); 
  }
};

export default RateLimiter;