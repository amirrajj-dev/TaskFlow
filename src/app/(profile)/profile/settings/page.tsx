import Settings from "@/components/profile/routes/settings/Settings";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Settings - TaskFlow",
  description: "Manage your profile, password, and account settings",
};

const SettingsPage = () => {
  return (
   <Settings/>
  );
};

export default SettingsPage;