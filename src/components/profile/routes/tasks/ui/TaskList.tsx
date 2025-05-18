"use client";
import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "@/generated/prisma";
import { AnimatePresence } from "framer-motion";
import { useTaskStore } from "@/store/task.store";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import DeleteDialog from "./DeleteDialog";

const TaskList = () => {
  const {
    tasks,
    isLoading,
    deleteTask,
    setOpenAddEditDialog,
    setEditingTask,
    setOpenDeleteDialog,
    openDeleteDialog,
    deletingTask,
    setDeletingTask,
  } = useTaskStore();
  const handleDeleteTask = async () => {
    if (!deletingTask) {
      toast.error("No task selected for deletion");
      return;
    }
    await deleteTask(deletingTask.id);
    setDeletingTask(null);
    setOpenDeleteDialog(false);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setOpenAddEditDialog(true);
  };

  const openDelete = (task: Task) => {
    setDeletingTask({ id: task.id, title: task.title });
    setOpenDeleteDialog(true);
  };

  return (
    <ul className="space-y-4">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <li
            key={i}
            className="border flex items-center rounded-lg p-4 bg-background shadow-sm space-y-2"
          >
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-2/3 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
            <div className="flex gap-2 justify-end">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="size-7 rounded-full" />
            </div>
          </li>
        ))
      ) : (
        <AnimatePresence>
          {tasks.length > 0 ? tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => openEdit(task)}
              onDelete={() => openDelete(task)}
            />
          )) : (
            <li className="border flex items-center rounded-lg p-4 bg-background shadow-sm space-y-2">
              <div className="flex flex-1 flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  No tasks found
                </p>
              </div>
            </li>
          )}
        </AnimatePresence>
      )}
      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={deletingTask?.title}
        isLoading={isLoading}
        onConfirm={handleDeleteTask}
      />
    </ul>
  );
};

export default TaskList;
