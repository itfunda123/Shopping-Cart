const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Middleware to generate token
const generateToken = async (req, res, next) => {
  const secret = process.env.MPESA_SECRET_KEY;
  const consumer = process.env.CONSUMER_KEY;
  const password = Buffer.from(`${consumer}:${secret}`).toString("base64");

  try {
    const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${password}`
      }
    });
    req.token = response.data.access_token;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token generation failed" });
  }
};

// STK Push route
router.post('/stk', generateToken, async (req, res) => {
  const phone = req.body.phone.startsWith("254") ? req.body.phone : `254${req.body.phone.substring(1)}`;
  const amount = req.body.amount;

  const date = new Date();
  const timestamp = date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14); // YYYYMMDDHHMMSS

  const shortcode = process.env.MPESA_PAYBILL;
  const passkey = process.env.PASSKEY;
  const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

  const data = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: "https://lazy-warthog.ngrok-free.app/api/mpesa/callback", // Replace with your backend callback endpoint
    AccountReference: "ShoppingCart",
    TransactionDesc: "Payment"
  };

  try {
    const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", data, {
      headers: { Authorization: 'Bearer ' + req.token }
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json({ error: err.response ? err.response.data : err.message });
  }
});

module.exports = router;
