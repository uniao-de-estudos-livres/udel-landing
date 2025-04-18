"use client";

import React, { useEffect } from "react"; // Import useEffect
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { useAuth } from "@/providers/auth-provider"; // Import useAuth
import { useRouter } from "next/navigation"; // Import useRouter

// Inner layout component that uses the context
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isSidebarVisible } = useSidebar();
  const { user, isAuthenticated, isLoading, hasAccess } = useAuth(); // Get auth state and access check
  const router = useRouter();

  useEffect(() => {
    // Wait until auth state is loaded and user is authenticated
    if (!isLoading && isAuthenticated) {
      // Check if user has beta access
      if (!hasAccess('beta_access')) {
        // Redirect to beta required page if access is missing
        console.log("User lacks beta_access, redirecting...");
        router.push('/beta-required');
      }
    }
    // Add dependencies for the effect
  }, [isLoading, isAuthenticated, hasAccess, router]);

  // Optional: Show a loading state while checking auth/access
  if (isLoading) {
     // Or return a proper loading skeleton component
     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is authenticated but doesn't have beta access yet,
  // they might see a flash of the dashboard before redirecting.
  // Alternatively, return null or loading until the redirect happens,
  // but this might cause issues if redirect fails.
  // The current approach redirects after rendering briefly.

  // If user is not authenticated, they should be redirected by a higher-level guard or middleware usually.
  // This layout assumes authentication is handled before reaching it,
  // but the check above adds the beta access layer.

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar isVisible={isSidebarVisible} />
      <main className={cn("flex-1 transition-all duration-300 ease-in-out", isSidebarVisible ? "pl-16" : "pl-0")}>
        {children}
      </main>
    </div>
  );
}

// Main layout component that wraps content with the provider
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // AuthProvider should wrap SidebarProvider if Sidebar needs auth context,
    // or wrap DashboardLayout if the layout itself needs auth (which it does now).
    // Assuming AuthProvider is already wrapping this part of the app tree higher up.
    // If not, AuthProvider needs to be added here or in the root layout.
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
