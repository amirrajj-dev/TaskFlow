"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motivationalQuotes } from "@/data/data";
import { useAuthStore } from "@/store/auth.store";
import { useTaskStore } from "@/store/task.store";
import OverviewCard from "./ui/OverviewCard";

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Overview = () => {
  const { user } = useAuthStore();
  const { getUserTasks, tasks } = useTaskStore();
  useEffect(() => {
    getUserTasks();
  }, []);
  const stats = {
    all: tasks?.length,
    completed: tasks?.filter((t) => t.status === "COMPLETED").length,
    inProgress: tasks?.filter((t) => t.status === "IN_PROGRESS").length,
    pending: tasks?.filter((t) => t.status === "PENDING").length,
  };

  const completionRate =
    stats.all > 0 ? (stats.completed / stats.all) * 100 : 0;

  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <main className="p-6 max-w-7xl w-full mx-auto space-y-8">
      <motion.section
        className="bg-background border rounded-xl p-6 shadow-sm"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold mb-4">User Info</h2>
        <div className="text-muted-foreground space-y-1">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
      </motion.section>

      <motion.section
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <OverviewCard
          title="Total Tasks"
          value={stats.all}
          color="text-indigo-600"
        />
        <OverviewCard
          title="Completed"
          value={stats.completed}
          color="text-primary"
        />
        <OverviewCard
          title="Pending"
          value={stats.pending}
          color="text-rose-600"
        />
        <OverviewCard
          title="In Progress"
          value={stats.inProgress}
          color="text-yellow-600"
        />
        <OverviewCard
          title="Completion Rate"
          value={`${completionRate.toFixed(1)}%`}
          color="text-green-600"
        />
      </motion.section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Tasks</h2>
        <motion.ul
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tasks.length > 0 ? (
            tasks.slice(0, 3).map(({ id, title, status, dueDate }) => (
              <motion.li
                key={id}
                className="border rounded-lg p-4 flex justify-between items-center bg-background shadow-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">
                    Due:{" "}
                    {dueDate ? new Date(dueDate).toLocaleDateString() : "—"}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    status === "COMPLETED"
                      ? "bg-primary/20 text-primary"
                      : status === "IN_PROGRESS"
                      ? "bg-yellow-500/20 text-yellow-600"
                      : "bg-rose-500/20 text-rose-600"
                  )}
                >
                  {status.replace("_", " ")}
                </span>
              </motion.li>
            ))
          ) : (
            <motion.div
              className="border rounded-lg p-4 flex justify-between items-center bg-background shadow-sm"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <p className="font-medium">No tasks found.</p>
            </motion.div>
          )}
        </motion.ul>
      </section>

      {/* Motivational Quote */}
      <motion.section
        className="bg-accent/30 p-6 rounded-xl border text-center"
        variants={itemVariants}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <p className="text-lg font-medium text-muted-foreground">
          “{randomQuote}”
        </p>
      </motion.section>
    </main>
  );
};

export default Overview;
