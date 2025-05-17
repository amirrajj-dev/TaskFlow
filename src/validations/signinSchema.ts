import { z } from "zod";

export const schema = z.object({
  email: z.string().nonempty("email is required").email("invalid email format"),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password should be atleast 6 characters long")
    .max(20, "password should be atmost 20 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "password should contain atleast 1 special character,one uppercase letter , one lowercase letter and numbers"
    )
});

export type SigninSchema = z.infer<typeof schema>