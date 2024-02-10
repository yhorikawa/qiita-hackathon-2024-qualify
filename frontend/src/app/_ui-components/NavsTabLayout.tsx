import { PropsWithChildren } from "react";

export const NavsTabLayout = ({
  children,
  Navigation,
}: PropsWithChildren<{ Navigation: React.ReactNode }>) => {
  return (
    <div className="pt-6">
      {Navigation}
      <div className="p-6" role="tabpanel">
        {children}
      </div>
    </div>
  );
};
