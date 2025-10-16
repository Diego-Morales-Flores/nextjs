import { BackButton } from "@/components/BackButton";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BackButton />
      {children}
    </div>
  );
}

export default layout;
