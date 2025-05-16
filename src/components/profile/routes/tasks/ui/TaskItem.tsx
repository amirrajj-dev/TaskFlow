import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Todo } from "@/generated/prisma";

interface TaskItemProps {
  task: Todo;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <li className="border rounded-lg p-4 flex justify-between items-center bg-background shadow-sm">
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <p className="text-sm text-muted-foreground">
          Priority: {task.priority} | Status: {task.status} | Due:{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
        </p>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={onEdit} aria-label="Edit task">
          <Edit className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onDelete} aria-label="Delete task">
          <Trash2 className="w-5 h-5 text-rose-600" />
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;