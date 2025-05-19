"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const passwordReg =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const changePasword = async (
  currentPassword: string,
  newPassword: string,
  userId: string
) => {
  try {
    if (!currentPassword.trim() || !newPassword.trim()) {
      return {
        error: "All fields are required",
        success: false,
        status: 400,
      };
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return {
        error: "User not found",
        success: false,
        status: 404,
      };
    }
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return {
        error: "Current password is incorrect",
        success: false,
        status: 400,
      };
    }
    if (!passwordReg.test(newPassword)) {
      return {
        error:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        success: false,
        status: 400,
      };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return {
      success: true,
      status: 200,
      message: "Password changed successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
      success: false,
      status: 500,
    };
  }
};

export const updateProfile = async (
  username: string,
  email: string,
  userId: string
) => {
  try {
    if (!username.trim() || !email.trim()) {
      return {
        error: "username and email are required",
        success: false,
        status: 400,
      };
    }
    if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)) {
      return {
        error: "invalid email format",
        success: false,
        status: 400,
      };
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return {
        error: "User not found",
        success: false,
        status: 404,
      };
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: username.trim(),
        email: email.trim(),
      },
    });
    return {
      success: true,
      status: 200,
      message: "Profile updated successfully",
      updatedUser,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
      success: false,
      status: 500,
    };
  }
};