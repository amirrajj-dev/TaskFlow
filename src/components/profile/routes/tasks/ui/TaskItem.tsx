'use client'

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task } from "@/generated/prisma";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="border mb-4 rounded-lg p-4 flex justify-between items-start bg-background shadow-sm"
    >
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
        
        {task.description && (
          <p className="text-sm text-muted-foreground mb-2 whitespace-pre-line">
            {task.description}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Priority: {task.priority} | Status: {task.status} | Due:{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
        </p>
      </div>

      <div className="flex gap-2 mt-1 ml-4">
        <Button size="icon" variant="ghost" onClick={onEdit} aria-label="Edit task">
          <Edit className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onDelete} aria-label="Delete task">
          <Trash2 className="w-5 h-5 text-rose-600" />
        </Button>
      </div>
    </motion.li>
  );
};

export default TaskItem;