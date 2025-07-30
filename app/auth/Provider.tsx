"use client";

import { SessionProvider } from "next-auth/react";
import React, { isValidElement, PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  console.log("AuthProvider children:", children);
  console.log("Is valid React element?", isValidElement(children));
  return <SessionProvider>{<>{children}</>}</SessionProvider>;
};

export default AuthProvider;
