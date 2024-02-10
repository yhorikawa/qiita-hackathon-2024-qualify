"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export const PrelineScript = () => {
  const path = usePathname();

  useEffect(() => {
    import("preline/preline");
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }, [path]);

  return null;
};
