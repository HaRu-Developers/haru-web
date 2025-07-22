import { z } from 'zod';
const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상 입력하셔야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하 입력하셔야 합니다." }),
  passwordCheck: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상 입력하셔야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하 입력하셔야 합니다." }),
  name: z.string().min(1, { message: "이름을 입력하셔야 합니다." }),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

export const isValidEmail = (email: string): boolean => {
  return schema.safeParse({ email }).success;
};
