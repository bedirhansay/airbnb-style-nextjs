"use client";

import React, { ReactNode, useEffect, useState } from "react";

export const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    if (!hasMounted) null;
  }, []);
  return <>{children}</>;
};
