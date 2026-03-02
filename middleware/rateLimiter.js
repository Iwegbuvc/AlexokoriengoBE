const rateLimit = require("express-rate-limit");
// 🔒 General API Rate Limiter (all endpoints)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 minutes
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for webhook requests
    return req.path === "/api/checkout/paystack/webhook";
  },
});

// 🔒 Auth Limiter (stricter for login/register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 attempts per 15 minutes
  message:
    "Too many login/register attempts from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// 🔒 Admin Limiter (stricter for admin operations)
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Max 50 requests per 15 minutes for admin operations
  message: "Too many admin requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for webhook
    return req.path === "/api/checkout/paystack/webhook";
  },
});

// 🔒 Password Reset Limiter (very strict)
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Max 3 attempts per hour
  message:
    "Too many password reset attempts. Please try again later or contact support.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter,
  authLimiter,
  adminLimiter,
  passwordResetLimiter,
};
