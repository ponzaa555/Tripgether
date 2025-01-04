"use client";

import { Badge } from "@/src/components/UI/badge";
import { Button } from "@/src/components/UI/Button";
import { Card } from "@/src/components/UI/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/UI/tooltip";
import { useConversation } from "@/src/hooks/useConversation";
import { useNavigation } from "@/src/hooks/useNavigation";
import { MobileChatNavbarProps } from "@/src/models/chat/conversation";
import Link from "next/link";

const MobileChatNavbar = ({ userId }: MobileChatNavbarProps) => {
  const paths = useNavigation({ userId: userId });
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
