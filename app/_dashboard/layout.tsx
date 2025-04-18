"use client";

import React, { useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isSidebarVisible } = useSidebar();
  const { isAuthenticated, isLoading, hasAccess } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (!hasAccess('beta_access')) {
        console.log("User lacks beta_access, redirecting...");
        router.push('/beta-required');
      }
    }
    // Add redirect for unauthenticated users trying to access dashboard layout
    else if (!isLoading && !isAuthenticated) {
        console.log("User not authenticated, redirecting to login...");
        router.push('/login'); // Or '/' if login is disabled
    }
  }, [isLoading, isAuthenticated, hasAccess, router]);

  // Show loading state while checking auth/access
  if (isLoading) {
     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is not authenticated or lacks access, they shouldn't reach here due to redirect
  // But as a fallback, prevent rendering children if not authenticated and has no access
  if (!isAuthenticated || (isAuthenticated && !hasAccess('beta_access'))) {
      // Render null or a minimal loading/redirecting message
      return null;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar isVisible={isSidebarVisible} />
      <main className={cn("flex-1 transition-all duration-300 ease-in-out", isSidebarVisible ? "pl-16" : "pl-0")}>
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // AuthProvider should wrap SidebarProvider if Sidebar needs auth context
    // Assuming AuthProvider is higher up in the tree
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
