import Profile from "@/components/profile/routes/home/Profile";
import { Metadata } from "next";


export const metadata : Metadata = {
  title: "Your Profile - Productivity App",
  description: "View your tasks, track progress, and stay motivated with personalized insights.",
};


const ProfilePage = () => {


  return (
   <Profile/>
  );
};

export default ProfilePage;
