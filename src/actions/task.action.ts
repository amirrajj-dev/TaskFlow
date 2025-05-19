'use server'

import prisma from "@/lib/prisma";
import { getCurrentUser } from "./auth.action";
import { revalidatePath } from "next/cache";
import { Task } from "@/interfaces/interfaces";

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

export const updateTask = async (id : string , task : Partial<Task>) => {
  try {
    if (!id){
      return {
        error: "Task id is required",
        success: false,
        status: 400
      }
    }
    const taskRes = await prisma.task.findUnique({where: {id}})
    if (!taskRes){
      return {
        error: "Task not found",
        success: false,
        status: 404
      }
    }
    const updatedTask = await prisma.task.update({
      where : {
        id
      },
      data : task
    })
    revalidatePath("/profile/tasks")
    return {
      success: true,
      status: 200,
      task: updatedTask,
      message: "Task updated successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
      success: false,
      status: 500
    }
  }
};

export const deleteTask = async (id : string) => {
  try {
    if (!id){
      return {
        error: "Task id is required",
        success: false,
        status: 400,
      }
    }
    await prisma.task.delete({
      where : {
        id
      }
    })
    revalidatePath("/profile/tasks")
    return {
      success: true,
      status: 200,
      message: "Task deleted successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
      success: false,
      status: 500,
    }
  }
};

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
