import { z } from 'zod';

export const isValidEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};
