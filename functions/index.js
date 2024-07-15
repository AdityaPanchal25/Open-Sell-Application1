/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
/* eslint-enable no-unused-vars */

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: "rzp_test_gKxd099EQ7UaJz",
  key_secret: "ZOQS2ucX2YeaOdqh0SD0gZMf",
});

// API
const app = express();

// App config
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received for this amount >>", total);
  
  const options = {
    amount: total, // amount in the smallest currency unit
    currency: "INR", // or your preferred currency
  };

  try {
    const order = await razorpay.orders.create(options);
    response.status(201).send({
      clientSecret: order.id, // Razorpay's order ID acts as clientSecret
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

// Listen command
exports.api = functions.https.onRequest(app);
