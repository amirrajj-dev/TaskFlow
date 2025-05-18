"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { changePasword } from "@/actions/user.action";
import { Loader2, Eye, EyeOff } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.25,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Settings = () => {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    setLoading(true);
    if (user?.id) {
      if (currentPassword && password && confirmPassword) {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match", {
            style: {
              backgroundColor: "#ec003f",
            },
          });
          setLoading(false);
          return;
        }
        console.log("user => ", user);
        const res = await changePasword(
          currentPassword,
          password,
          user?.id as string
        );
        if (res.success) {
          toast.success("Password changed successfully", {
            style: {
              backgroundColor: "#00bc7d",
            },
          });
          setCurrentPassword("");
          setPassword("");
          setConfirmPassword("");
          setLoading(false);
        } else {
          toast.error(res.message || res.error || "Something went wrong", {
            style: {
              backgroundColor: "#ec003f",
            },
          });
          setLoading(false);
        }
      } else {
        toast.error("Please fill all fields", {
          style: {
            backgroundColor: "#ec003f",
          },
        });
        setLoading(false);
      }
    }
  };

  return (
    <motion.main
      className="max-w-7xl w-full mx-auto p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Settings
      </motion.h1>

      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                defaultValue={user?.name}
                value={name}
                id="name"
                type="text"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                defaultValue={user?.email}
                value={email}
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="mt-4 cursor-pointer">Save Profile</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Password */}
            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-7.5 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
                aria-label={
                  showCurrentPassword ? "Hide password" : "Show password"
                }
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-7.5 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-7.5 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              disabled={loading}
              className="mt-4 cursor-pointer"
              onClick={() => handleChangePassword()}
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Change Password"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.main>
  );
};

export default Settings;
