"use client";
import BlogContent from "@/components/home_page/blog_content/BlogContent";
import HomeContent from "@/components/home_page/home_content/HomeContent";
import Welcome from "@/components/home_page/welcome_content/Welcome";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <HomeContent />
      <div className="h-full bg-white">
        <Welcome />
        <BlogContent />
      </div>
    </>
  );
}
