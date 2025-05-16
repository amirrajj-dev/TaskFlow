import Overview from "@/components/profile/routes/overview/Overview";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Profile Overview - TaksFlow",
  description: "Get a quick glance at your profile details, task stats, and recent activities.",
};

const ProfileOverview = () => {
  return (
    <Overview/>
  ) 
};

export default ProfileOverview;