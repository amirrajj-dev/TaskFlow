"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskList from "./ui/TaskList";
import TaskDialog from "./ui/Taskdialog";
import type { Task } from "@/generated/prisma";
import { toast } from "sonner";
import { useTaskStore } from "@/store/task.store";

const Tasks = () => {
  const {addTask , getUserTasks , isLoading , openAddEditDialog , setOpenAddEditDialog , setEditingTask , editingTask} = useTaskStore()

  useEffect(() => {
   getUserTasks()
  }, []);

  const openCreate = () => {
    setEditingTask(null);
    setOpenAddEditDialog(true);
  };

  const saveTask = async (task: Omit<Task, "createdAt" | "updatedAt" | "id">) => {
    if (editingTask) {
      //? update task
    } else {
     const res = await addTask(task as Task);
     return {
      success : res.success
     }
    }
    setOpenAddEditDialog(false);
  };

  return (
    <main className="max-w-7xl w-full mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button
          onClick={openCreate}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Task
        </Button>
      </div>

      <TaskList />

      <TaskDialog
        open={openAddEditDialog}
        onOpenChange={setOpenAddEditDialog}
        onSave={saveTask}
        task={editingTask}
        isLoading={isLoading}
      />
    </main>
  );
};

export default Tasks;
