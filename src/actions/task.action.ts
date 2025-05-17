'use server'

import { Task } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./auth.action";
import { revalidatePath } from "next/cache";

export const addTask = async (
  task: Pick<Task, "title" | "description" | "status" | "priority" | "dueDate">
) => {
  try {
    const { description, dueDate, priority, status, title } = task;
    const currentUserRes = await getCurrentUser();
    if (!currentUserRes.success || !currentUserRes.user) {
      return {
        error: "Unauthorized",
        success: false,
        status: 401,
      };
    }
    const currentUser = currentUserRes.user;

    if (!title.trim()) {
      return {
        error: "All fields are required",
        success: false,
        status: 400,
      };
    }
    const newTask = await prisma.task.create({
      data: {
        title,
        description: description?.trim() || undefined,
        status,
        priority,
        dueDate,
        user: {
          connect: {
            id: currentUser!.id,
          },
        },
      },
    });
    revalidatePath("/profile/tasks")
    return {
      success: true,
      status: 201,
      task: newTask,
      message: "Task created successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
      success: false,
      status: 500,
    };
  }
};

export const updateTask = async () => {};

export const deleteTask = async () => {};

export const getTasks = async () => {
    try {
        const currentUser = (await getCurrentUser()).user
        if (!currentUser) {
            return {
                error : 'Unauthorized',
                success : false,
                status : 401
            }
        }
        const tasks = await prisma.task.findMany({
            where : {
                userId : currentUser.id
            }
        })
        return {
            success : true,
            status : 200,
            tasks
        }
    } catch (error) {
        return {
            error : error instanceof Error ? error.message : 'Something went wrong',
            success : false,
            status : 500
        }
    }
};
