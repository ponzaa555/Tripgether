"use client";

import ConvarsationFallback from "@/components/chat_page/conversation/ConvarsationFallback";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  useEffect(() => {
    router.push("/chat");
  }, [error, router]);

  return <ConvarsationFallback />;
}
