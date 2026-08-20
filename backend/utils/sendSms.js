// backend/utils/sendSms.js
//
// Chhota sa pluggable SMS sender.
// Abhi koi paid SMS gateway (Twilio / MSG91 / Fast2SMS) configure nahi hai,
// isliye default "dev mode" me hum OTP ko sirf server console pe log karte
// hain — taaki local/testing me bina real SMS credits ke pura flow test ho sake.
//
// Production me jaana ho to bas .env me SMS_PROVIDER + credentials daal do
// aur neeche wale if-block me apna gateway ka actual API call daal dena.
// Baaki poora register/OTP flow (controller, routes, frontend) bina kisi
// change ke kaam karta rahega.

const sendSms = async (mobilenumber, message) => {
  const provider = process.env.SMS_PROVIDER; // e.g. "twilio", "msg91"

  if (!provider) {
    // ---- DEV / DEMO MODE ----
    console.log(`\n📱 [DEV SMS] To: ${mobilenumber}`);
    console.log(`📱 [DEV SMS] Message: ${message}\n`);
    return { success: true, dev: true };
  }

  // ---- PRODUCTION MODE (plug your real gateway here) ----
  // Example (Twilio):
  // const twilioClient = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  // await twilioClient.messages.create({
  //   body: message,
  //   from: process.env.TWILIO_FROM_NUMBER,
  //   to: `+91${mobilenumber}`,
  // });

  console.log(`[SMS] Provider "${provider}" configured but not implemented yet.`);
  return { success: true, dev: false };
};

export default sendSms;