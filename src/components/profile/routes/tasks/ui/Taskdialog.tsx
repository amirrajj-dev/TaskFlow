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
import { PRIORITY, STATUS, Task } from "@/interfaces/interfaces";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { Loader2 } from "lucide-react";
import { useTaskStore } from "@/store/task.store";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => Promise<{success : boolean}>;
  isLoading: boolean;
}

const statusValues = ["COMPLETED", "PENDING", "IN_PROGRESS"];
const priorityValues = ["LOW", "MEDIUM", "HIGH"];

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  isLoading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<STATUS>(STATUS.PENDING);
  const [priority, setPriority] = useState<PRIORITY>(PRIORITY.LOW);
  const [dueDate, setDueDate] = useState("");
  const { user } = useAuthStore();
  const {editingTask , setEditingTask} = useTaskStore()

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setStatus(editingTask.status as STATUS);
      setPriority(editingTask.priority as PRIORITY);
      setDueDate(editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().slice(0 , 10) : "");
    } else {
      resetDialog();
    }
  }, [editingTask]);

  const handleSubmit = async () => {
    if (!title.trim() || !priority || !status) {
      toast.error("All fields are required", {
        style: {
          backgroundColor: "#ec003f",
        },
      });
      return;
    }
    const res = await onSave({
      title,
      description,
      status,
      priority,
      dueDate: new Date(dueDate),
      userId: user!.id,
    });
    if (res.success){
      resetDialog();
      onOpenChange(false);
    } 
  };

  function resetDialog() {
    setTitle("");
    setDescription("");
    setStatus("PENDING" as STATUS);
    setPriority("LOW" as PRIORITY);
    setDueDate("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingTask ? "Edit Task" : "New Task"}</DialogTitle>
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
              className="cursor-pointer"
              onClick={() =>{ onOpenChange(false);resetDialog();setEditingTask(null)} }
            >
              Cancel
            </Button>
            {editingTask ? (
              <Button type="submit" className="cursor-pointer">
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            ) : (
              <Button type="submit" className="cursor-pointer">
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
