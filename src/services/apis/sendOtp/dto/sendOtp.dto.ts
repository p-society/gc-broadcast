import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateSendOtpValidation = z.object({
  email: z.string().email().nonempty(),
});

export type CreateSendOtpDTO = z.infer<typeof CreateSendOtpValidation>;
