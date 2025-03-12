import React from "react";
import NotificationLoggedIn from "@/components/notificationLoggedIn/NotificationLoggedIn";
import EditForm from "@/components/editForm/EditForm";

export default function Page() {
  return (
    <div className="min-h-screen text-white">
      <nav className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Linkly
        </h1>
        <NotificationLoggedIn />
      </nav>
      <EditForm />
    </div>
  );
}