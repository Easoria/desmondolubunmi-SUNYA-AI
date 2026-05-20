import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Starfield } from "@/components/Starfield";
import { AuthModal } from "@/components/site/AuthModal";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Sign in — Sunya" }, { name: "robots", content: "noindex" }],
  }),
});

function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Nav />
      <main className="relative min-h-[calc(100vh-200px)] overflow-hidden pt-24 pb-16">
        <Starfield density={0.6} />
      </main>
      <Footer />
      <AuthModal
        open
        dismissible
        onClose={() => {
          if (typeof window !== "undefined" && window.history.length > 1) {
            window.history.back();
          } else {
            navigate({ to: "/" });
          }
        }}
        onAuthSuccess={() => navigate({ to: "/dashboard" })}
      />
    </div>
  );
}
