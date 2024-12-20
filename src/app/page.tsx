"use client";

import BlogContent from "@/components/home_page/blog_content/BlogContent";
import HomeContent from "@/components/home_page/home_content/HomeContent";
import Welcome from "@/components/home_page/welcome_content/Welcome";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const createUser = useMutation(api.user.create);
  useEffect(() => {
    const createUserIfAuthenticated = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          await createUser({
            userId: session.user.id,
            username: session.user.name ?? "Unknown",
            imageUrl:
              session.user.image ??
              "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg",
            email: session.user.email ?? "Unknown",
          });
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    };
    createUserIfAuthenticated();
  }, [status, session, createUser]);
  return (
    <>
      <HomeContent />
      <div className="flex flex-col gap-20 h-full w-screen bg-white">
        <Welcome />
        <BlogContent />
      </div>
    </>
  );
}
