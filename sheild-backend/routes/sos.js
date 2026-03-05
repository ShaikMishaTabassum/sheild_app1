const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/trigger", async (req, res) => {

  const { phone, latitude, longitude } = req.body;

  try {

    const message = await client.messages.create({
      body: `🚨 SOS ALERT!
User needs help.

Location:
https://maps.google.com/?q=${latitude},${longitude}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({
      success: true,
      message: "SOS SMS sent",
      sid: message.sid
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

module.exports = router;