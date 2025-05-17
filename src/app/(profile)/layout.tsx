import Sidebar from "@/components/profile/ui/sidebar/Sidebar";
import AuthProvider from "@/components/providers/AuthProvider";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        {children}
      </div>
    </AuthProvider>
  );
};

export default ProfileLayout;
