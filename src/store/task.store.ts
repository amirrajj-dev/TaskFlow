import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/generated/prisma";
import { addTask, deleteTask, getTasks } from "@/actions/task.action";
import { toast } from "sonner";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => Promise<{success : boolean}>;
  editingTask : Task | null;
  deletingTask : null | Pick<Task , "id" | "title">
  setEditingTask: (task: Task | null) =>void;
  deleteTask : (id : string) =>void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  getUserTasks: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
  setDeletingTask : (task : Pick<Task , "id" | "title"> | null) => void
  openAddEditDialog : boolean;
  openDeleteDialog : boolean
  setOpenAddEditDialog : (openDialog : boolean) => void
  setOpenDeleteDialog : (openDialog : boolean) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      editingTask : null,
      deletingTask : null,
      isLoading: false,
      error: null,
      openAddEditDialog : false,
      openDeleteDialog : false,
      setTasks: (tasks) => set({ tasks }),
      setEditingTask(task) {
        set({ editingTask: task });
      },
      setDeletingTask(task) {
        set({ deletingTask: task });
      },
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
            return {
              success : true
            }
          } else {
            toast.error(res.error || "Failed to create task" , {
                style : {
                    backgroundColor : "#ec003f"
                }
            });
            return {
              success : false
            }
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Something went wrong",
          });
          return {
            success : false
          }
        } finally {
          set({ isLoading: false });
        }
      },
      deleteTask : async (id : string) => {
        try {
          if (id){
            set({ isLoading: true });
            const res = await deleteTask(id);
            if (res.success) {
              toast.success("Task deleted successfully!" , {
                  style : {
                      backgroundColor : "#00bc7d"
                  }
              });
              set({ tasks: get().tasks.filter((task) => task.id !== id) });
            }else{
              toast.error(res.error || "Failed to delete task" , {
                style : {
                  backgroundColor : "#ec003f"
                }
              });
            }
          }else {
            toast.error("Task id is required" , {
              style : {
                backgroundColor : "#ec003f"
              }
            })
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
        if (get().tasks.length > 0) return;
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
      setOpenAddEditDialog(openDialog) {
        set({ openAddEditDialog: openDialog });
      },
      setOpenDeleteDialog(openDialog) {
        set({ openDeleteDialog: openDialog });
      },
    }),
    {
      name: "task-storage",
      partialize: (state) => ({ tasks: state.tasks })
    }
  )
);