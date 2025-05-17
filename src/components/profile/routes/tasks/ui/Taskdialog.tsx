"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PRIORITY, STATUS, Task } from "@/generated/prisma";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { Loader2 } from "lucide-react";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  task: Task | null;
  isLoading : boolean
}

const statusValues = ["COMPLETED", "PENDING", "IN_PROGRESS"];
const priorityValues = ["LOW", "MEDIUM", "HIGH"];

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  task,
  isLoading
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<STATUS>("PENDING");
  const [priority, setPriority] = useState<PRIORITY>("LOW");
  const [dueDate, setDueDate] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate?.toLocaleDateString() || "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("PENDING");
      setPriority("LOW");
      setDueDate("");
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim() || !priority || !status) {
      toast.error("All fields are required", {
        style: {
          backgroundColor: "#ec003f",
        },
      });
      return;
    }
    onSave({
      title,
      description,
      status,
      priority,
      dueDate: new Date(dueDate),
      userId: user!.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "New Task"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="status" className="block font-medium mb-1">
              Status
            </label>
            <Select
              onValueChange={(v) => setStatus(v as STATUS)}
              value={status}
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusValues.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="priority" className="block font-medium mb-1">
              Priority
            </label>
            <Select
              onValueChange={(v) => setPriority(v as PRIORITY)}
              value={priority}
            >
              <SelectTrigger id="priority" className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorityValues.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block font-medium mb-1">
              Due Date
            </label>
            <Input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            {task ? (
              <Button type="submit">
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            ) : (
              <Button type="submit">
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
