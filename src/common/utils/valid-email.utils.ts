import { emailSchema } from '@common/schemas/validation-schemas';

export const isValidEmail = (email: string): boolean => {
  return emailSchema.safeParse({ email }).success;
};
