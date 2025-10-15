"use client"; // This is OK because only admins will see these pages.
import { useEffect } from "react";

export default function GeheimelocatieLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  useEffect(() => {
    const headerElement = document.getElementsByTagName("header");
    if (headerElement[0]) {
      headerElement[0].style.display = "none";
    }
  }, []);

  return <div>{children}</div>;
}
