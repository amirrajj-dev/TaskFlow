import Tasks from "@/components/profile/routes/tasks/Tasks";


export const metadata = {
  title: "Tasks | TaksFlow",
  description: "View and manage your tasks — filter by status, sort by priority or due date, and keep your productivity on track.",
};


const TasksPage = () => {
  return (
    <Tasks/>
  )
};

export default TasksPage;