import { passwordSchema } from '@common/schemas/validation.schemas';

export const isValidPassword = (password: string, confirmPassword: string): boolean => {
  const result = passwordSchema.safeParse({ password, confirmPassword });
  return result.success;
};
