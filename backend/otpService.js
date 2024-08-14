const twilio = require('twilio');

const accountSid = 'AC8fe3058b4c94c462cb61300b0f32545b'; // Replace with your Account SID from Twilio
const authToken = '46b45e77f5cb0bcb3c2b2f37aee87dba'; // Replace with your Auth Token from Twilio
const client = new twilio(accountSid, authToken);

const sendOtpToPhoneNumber = async (phoneNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const message = `Your OTP code is ${otp}`;
  
  // Store OTP in a database or cache (for demonstration, it's returned directly)
  await client.messages.create({
    body: message,
    to: phoneNumber,
    from: '+91 7743933902' // Replace with your Twilio phone number
  });

  // In a real application, save the OTP and phoneNumber in a database with a timestamp
  return otp;
};

const verifyOtpForPhoneNumber = async (phoneNumber, enteredOtp) => {
  // Retrieve the OTP from the database or cache
  const storedOtp = 123456; // This should be replaced with the actual stored OTP

  if (enteredOtp === storedOtp) {
    // Invalidate the OTP after successful verification
    // Delete or mark the OTP as used in your database
    return true;
  } else {
    throw new Error('Invalid OTP');
  }
};

module.exports = {
  sendOtpToPhoneNumber,
  verifyOtpForPhoneNumber
};
