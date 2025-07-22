import { z } from 'zod';
export const emailSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다." }),
});