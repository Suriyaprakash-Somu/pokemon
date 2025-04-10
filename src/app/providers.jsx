"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { useState } from "react";

export default function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={null}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
