"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskList from "./ui/TaskList";
import TaskDialog from "./ui/Taskdialog";
import type { Task, STATUS, PRIORITY } from "@/generated/prisma";

// Dummy initial data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Finish profile page UI",
    status: "COMPLETED",
    priority: "MEDIUM",
    dueDate: "2025-05-20",
  },
  {
    id: "2",
    title: "Fix bug in task list",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2025-05-23",
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openCreate = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const saveTask = (task: Task) => {
    if (editingTask) {
      //? update task
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...task, id: editingTask.id } : t))
      );
    } else {
      //? create new task
      setTasks((prev) => [{ ...task, id: (prev.length + 1).toString() }, ...prev]);
    }
    setDialogOpen(false);
  };

  const deleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <main className="max-w-7xl w-full mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={openCreate} variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Task
        </Button>
      </div>

      <TaskList tasks={tasks} onEdit={openEdit} onDelete={deleteTask} />

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={saveTask}
        task={editingTask}
      />
    </main>
  );
};

export default Tasks;
