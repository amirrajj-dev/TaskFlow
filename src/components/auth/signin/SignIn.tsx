'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Logo from "@/components/shared/logo/Logo"
import Link from "next/link"

const Signin = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-muted p-2"
    >
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-border">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <form className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button type="submit" className="w-full">Sign In</Button>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-primary underline">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Signin