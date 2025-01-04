"use client";

import { Badge } from "@/src/components/UI/badge";
import { Button } from "@/src/components/UI/Button";
import { Card } from "@/src/components/UI/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/UI/tooltip";
import { useNavigation } from "@/src/hooks/useNavigation";
import { ChatNavbarProps } from "@/src/models/chat/conversation";
import Link from "next/link";

const ChatNavbar = ({ userId }: ChatNavbarProps) => {
  const paths = useNavigation({ userId: userId });
  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
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

export default ChatNavbar;
