"use client";
import React, { useMemo } from "react";
import { motivationalQuotes } from "@/data/data";
import { useAuthStore } from "@/store/auth.store";
import { useTaskStore } from "@/store/task.store";

const Profile = () => {
  const randomQuote = useMemo(() => {
    return motivationalQuotes[
      Math.floor(Math.random() * motivationalQuotes.length)
    ];
  }, []);

  const { user } = useAuthStore();
  const tasks = useTaskStore((state)=>state.tasks)
  const tasksStats = {
    completed: tasks?.filter((t) => t.status === "COMPLETED").length,
    inProgress: tasks?.filter((t) => t.status === "IN_PROGRESS").length,
    pending: tasks?.filter((t) => t.status === "PENDING").length,
  };
  return (
    <main className="flex-1 p-6 pt-16 md:pt-6">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, {user?.name.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Here's a quick glance at your productivity today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-background border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-medium text-muted-foreground">
              Tasks Completed
            </h2>
            <p className="text-2xl font-semibold text-primary mt-1">
              {tasksStats.completed}
            </p>
          </div>
          <div className="bg-background border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-medium text-muted-foreground">
              In Progress
            </h2>
            <p className="text-2xl font-semibold text-yellow-500 mt-1">
              {tasksStats.inProgress}
            </p>
          </div>
          <div className="bg-background border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-medium text-muted-foreground">
              Pending
            </h2>
            <p className="text-2xl font-semibold text-rose-500 mt-1">
              {tasksStats.pending}
            </p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-accent/30 p-4 md:p-6 rounded-xl border text-center">
          <p className="text-md md:text-lg text-muted-foreground font-medium">
            “{randomQuote}”
          </p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
