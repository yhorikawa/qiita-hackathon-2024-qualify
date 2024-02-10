import React, { PropsWithChildren } from "react";

export const NavsTabLayout = ({
  children,
  tab,
  Navigation,
}: PropsWithChildren<{ tab: number; Navigation: React.ReactNode }>) => (
  <div className="pt-6">
    {Navigation}
    <div className="p-6" id={`tabs-with-badges-${tab}`} role="tabpanel">
      {children}
    </div>
  </div>
);
