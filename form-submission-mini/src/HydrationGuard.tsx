import type { ReactNode } from "react";
import { useAuthStore } from "./store/userStore";

interface HydrationGuardProps {
  children: ReactNode;
}

export default function HydrationGuard({ children }: HydrationGuardProps) {
  const hasHydrated = (useAuthStore as any).persist?.hasHydrated?.() ?? true;

  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
