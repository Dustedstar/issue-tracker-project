"use client";

import { SessionProvider } from "next-auth/react";
import React, { isValidElement, PropsWithChildren, ReactElement } from "react";

type ThemeProps = {
  children: React.ReactNode;
  accentColor?: string;
  scaling?: string;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  if (isValidElement(children)) {
    const element = children as ReactElement<ThemeProps>;

    console.log("Children props:", element.props);
    console.log("Children.props.children:", element.props.children);

    if (Array.isArray(element.props.children)) {
      console.warn(
        "⚠️ element.props.children is an array:",
        element.props.children
      );
    } else {
      console.log(
        "✅ element.props.children is a single element:",
        element.props.children
      );
    }
  }
  return <SessionProvider>{<>{children}</>}</SessionProvider>;
};

export default AuthProvider;
