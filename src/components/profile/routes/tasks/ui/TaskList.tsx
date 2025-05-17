"use client";
import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "@/generated/prisma";
import { AnimatePresence } from "framer-motion";
import { useTaskStore } from "@/store/task.store";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskListProps {
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit, onDelete }) => {
  const { tasks, isLoading } = useTaskStore();

  return (
    <ul className="space-y-4">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="border flex items-center rounded-lg p-4 bg-background shadow-sm space-y-2">
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
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </AnimatePresence>
      )}
    </ul>
  );
};

export default TaskList;