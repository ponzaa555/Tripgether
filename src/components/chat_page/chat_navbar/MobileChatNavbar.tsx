"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConversation } from "@/hooks/useConversation";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

const MobileChatNavbar = () => {
  const paths = useNavigation();
  const { isActive } = useConversation();

  if (isActive) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => {
            return (
              <li className="relative" key={id}>
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <>
                        <Button
                          size="icon"
                          variant={path.active ? "default" : "outline"}
                        >
                          {path.icon}
                        </Button>
                        {path.count ? (
                          <Badge className="absolute left-6 bottom-7 px-2">
                            {path.count}
                          </Badge>
                        ) : null}
                      </>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div></div>
    </Card>
  );
};

export default MobileChatNavbar;
