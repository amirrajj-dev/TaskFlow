"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskList from "./ui/TaskList";
import TaskDialog from "./ui/Taskdialog";
import type { Task, STATUS, PRIORITY } from "@/generated/prisma";
import { toast } from "sonner";
import { useTaskStore } from "@/store/task.store";

const Tasks = () => {
  const {addTask , getUserTasks , isLoading} = useTaskStore()
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
   getUserTasks()
  }, []);

  const openCreate = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const saveTask = async (task: Omit<Task, "createdAt" | "updatedAt" | "id">) => {
    if (editingTask) {
      //? update task
    } else {
      await addTask(task as Task);
    }
    setDialogOpen(false);
  };

  const deleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
    }
  };

  return (
    <main className="max-w-7xl w-full mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button
          onClick={openCreate}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Task
        </Button>
      </div>

      <TaskList onEdit={openEdit} onDelete={deleteTask} />

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={saveTask}
        task={editingTask}
        isLoading={isLoading}
      />
    </main>
  );
};

export default Tasks;
