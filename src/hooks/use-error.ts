import { ErrorContext } from "@/app/providers/error-provider";
import { useContext } from "react";

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
