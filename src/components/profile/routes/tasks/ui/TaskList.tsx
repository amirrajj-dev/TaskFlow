import React from "react";
import TaskItem from "./TaskItem";
import { Todo } from "@/generated/prisma";

interface TaskListProps {
  tasks: Todo[];
  onEdit: (task: Todo) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={() => onEdit(task)} onDelete={() => onDelete(task.id)} />
      ))}
    </ul>
  );
};

export default TaskList;