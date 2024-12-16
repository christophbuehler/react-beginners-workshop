"use client";

import { MyProfileContext } from "@/app/providers/my-profile-provider";
import { useContext } from "react";

export const useMyProfile = () => {
  const context = useContext(MyProfileContext);
  if (!context)
    throw new Error("useMyProfile must be used within a MyProfileProvider");
  return context;
};
