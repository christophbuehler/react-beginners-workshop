import { InboxContext } from "@/app/providers/inbox-provider";
import { useContext } from "react";

export const useInbox = () => {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error("useInbox must be used within an InboxProvider");
  }
  return context;
};
