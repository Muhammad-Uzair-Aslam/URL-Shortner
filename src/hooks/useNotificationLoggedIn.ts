import { useState } from "react";
import { useSession } from "next-auth/react";

export const useNotificationLoggedIn = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const { data: session } = useSession();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggleDropdown, setIsOpen, session };
};