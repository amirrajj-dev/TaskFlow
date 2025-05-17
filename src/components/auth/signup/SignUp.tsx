"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Logo from "@/components/shared/logo/Logo";
import Link from "next/link";
import { SignupSchema, schema } from "@/validations/signupSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/shared/error/FormError";
import { signup } from "@/actions/auth.action";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const { setUser } = useAuthStore();
  const [submittedSuccesFul, setSubmittedSuccesFul] = useState(false);
  const [showPassword , setShowPassword] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<SignupSchema>({
    mode: "onBlur",
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: SignupSchema) => {
    const res = await signup(data);
    if (res.error) {
      toast.error(res.error || "Something went wrong" , {
        style : {
          backgroundColor : "#ec003f"
        }
      });
      setSubmittedSuccesFul(false)
      return;
    }
    if (res.success && res.user) {
      toast.success("Account created successfully" , {
        style : {
          backgroundColor : "#00bc7d"
        }
      });
      setUser(res.user);
      setSubmittedSuccesFul(true);
      router.push("/")
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-muted p-2"
    >
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-border">
        <CardContent className="p-8 space-y-6">
          <Link href={"/"} className="flex justify-center mb-4">
            <Logo />
          </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input {...register("name")} id="name" placeholder="John Doe" />
              {errors.name && <FormError message={errors.name.message!} />}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="you@example.com"
              />
              {errors.email && <FormError message={errors.email.message!} />}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="username">UserName</Label>
              <Input
                {...register("username")}
                id="username"
                type="username"
                placeholder="your username"
              />
              {errors.username && (
                <FormError message={errors.username.message!} />
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              {showPassword ? (
                <EyeOff className="absolute top-7 right-3 opacity-50" onClick={()=> setShowPassword(!showPassword)}/>
              ) : (
                <Eye className="absolute top-7 right-3 opacity-50" onClick={()=> setShowPassword(!showPassword)}/>
              )}
              {errors.password && (
                <FormError message={errors.password.message!} />
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer disabled:cursor-not-allowed"
              disabled={isSubmitting || submittedSuccesFul}
            >
              {isSubmitting ? (
                <Loader2 className="size-5 animate-spin" />
              ) : submittedSuccesFul ? (
                "Signed Up"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href={"/signin"} className="text-primary underline">
              Signin
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Signup;
