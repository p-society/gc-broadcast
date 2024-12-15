export default function generateRandomNumber(len = 6): string {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    OTP += digits[randomIndex];
  }

  return OTP;
}
