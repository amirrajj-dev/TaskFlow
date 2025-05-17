import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .nonempty("name is required")
    .min(6, "name must be ateleast 6 characters long")
    .max(30, "name must be atmost 6 characters long"),
  email: z.string().nonempty("email is required").email("invalid email format"),
  username: z
    .string()
    .nonempty("username is required")
    .min(5, "username must be atleast 6 characters long")
    .max(16, "username must be atmost 16 characters long"),
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

export type SignupSchema = z.infer<typeof schema>