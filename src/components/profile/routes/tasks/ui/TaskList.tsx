"use client";
import React, { useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import { Task } from "@/generated/prisma";
import { AnimatePresence } from "framer-motion";
import { useTaskStore } from "@/store/task.store";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import DeleteDialog from "./DeleteDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "pending" | "in_progress"
  >("all");
  const [sortBy, setSortBy] = useState<"createdAt" | "title">("createdAt");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by status
    if (filterStatus === "completed") {
      result = result.filter((t) => t.status === "COMPLETED");
    } else if (filterStatus === "pending") {
      result = result.filter((t) => t.status === "PENDING");
    }else if (filterStatus === "in_progress") {
      result = result.filter((t) => t.status === "IN_PROGRESS");
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });

    return result;
  }, [tasks, filterStatus, sortBy, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Filter and Sort */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label className="text-sm">Filter:</label>
            <Select
              value={filterStatus}
              onValueChange={(e) => setFilterStatus(e as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm">Sort By:</label>
            <Select value={sortBy} onValueChange={(e) => setSortBy(e as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Created At" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Task List */}
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
            {filteredSortedTasks.length > 0 ? (
              <ScrollArea className="h-[560px] space-y-5 p-1 sm:p-4">
                {filteredSortedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={() => openEdit(task)}
                    onDelete={() => openDelete(task)}
                  />
                ))}
              </ScrollArea>
            ) : (
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
      </ul>

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={deletingTask?.title}
        isLoading={isLoading}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
};

export default TaskList;
