import { date, z } from 'zod';

// DTO for incoming OTP payload. This ensures the payload structure and validates fields.
/**
 * The email of the user to send OTP.
 * @example  "test@gmail.com"
 * */

export const OtpValidation = z.object({
  email: z.string().email(),
});

/**
 * The email of the user to send OTP.
 * @example  "
 * */
export const VerifyOtpValidation = z.object({
  email: z.string().email(),
  otp: z.string().trim(),
});

export type OtpDto = z.infer<typeof OtpValidation>;
export type VerifyOtpDto = z.infer<typeof VerifyOtpValidation>;
