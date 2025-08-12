import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
});

export const passwordSchema = z
  .object({
    password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    confirmPassword: z.string().min(8, { message: '비밀번호 확인은 최소 8자 이상이어야 합니다.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {});
