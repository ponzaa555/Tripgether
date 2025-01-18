"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
    children:ReactNode;
    roomId : string;
    fallback : ReactNode;
}

export function Room({ children , roomId , fallback}:RoomProps) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_P-fMUEx1U-PkzEY_fpYoqDBogfUAzIDLAZl0P7FtgsVeF1FRa9GOR3pCmGX7SJlR"}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}