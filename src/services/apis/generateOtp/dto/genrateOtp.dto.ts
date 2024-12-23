// DTO for incoming OTP payload. This ensures the payload structure and validates fields.
export class OtpDto {
  /**
   * The email of the user to send OTP.
   * @example  "test@gmail.com"
   * */

  email: string;
}

export class VerifyOtpDto {
  /**
   * The email of the user to send OTP.
   * @example  "
   * */

  email: string;
  otp: string;
}
