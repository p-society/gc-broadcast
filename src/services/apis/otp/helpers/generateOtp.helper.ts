// import { z } from 'zod';

// const emailSchema = z.string().email();

// export function processEmail(input: { email: string }): { email: string } {
//   const parsedEmail = emailSchema.safeParse(input.email);

//   if (!parsedEmail.success) {
//     throw new Error('Invalid email: Must be a valid email format');
//   }

//   return {
//     email: input.email.trim(),
//   };
// }
