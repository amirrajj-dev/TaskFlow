import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/generated/prisma";
import { addTask, getTasks } from "@/actions/task.action";
import { toast } from "sonner";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  getUserTasks: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,
      error: null,
      setTasks: (tasks) => set({ tasks }),
      addTask: async (task) => {
        try {
          set({ isLoading: true });
          const res = await addTask(task);
          if (res.success) {
            toast.success("Task created successfully!" , {
                style : {
                    backgroundColor : "#00bc7d"
                }
            });
            set({ tasks: [...get().tasks, res.task as Task] });
          } else {
            toast.error(res.error || "Failed to create task" , {
                style : {
                    backgroundColor : "#ec003f"
                }
            });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Something went wrong",
          });
        } finally {
          set({ isLoading: false });
        }
      },
      setIsLoading: (isLoading) => set({ isLoading }),
      getUserTasks: async () => {
        try {
          set({ isLoading: true });
          const res = await getTasks();
          if (res.success) {
            set({ tasks: res.tasks as Task[], isLoading: false });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Something went wrong",
          });
        } finally {
          set({ isLoading: false });
        }
      },
      setError: (error) => set({ error }),
    }),
    {
      name: "task-storage",
      partialize: (state) => ({ tasks: state.tasks })
    }
  )
);