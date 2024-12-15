export interface BaseEmailContext {}

export interface OtpContext extends BaseEmailContext {
  otp: string;
}
