import React, { PropsWithChildren } from "react";

export const NavsTabLayout = ({
  children,
  Navigation,
}: PropsWithChildren<{ Navigation: React.ReactNode }>) => (
  <div className="pt-6">
    {Navigation}
    <div className="p-6">{children}</div>
  </div>
);
