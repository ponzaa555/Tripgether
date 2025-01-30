import { useMyPresence, useOthers } from "@liveblocks/react";
import React from "react";

type Props = {
  name?: string;
  color?: string;
  coverImg? : boolean
};

export default function Selection({ name, color , coverImg }: Props) {
  return (
    <div className="absolute pointer-events-none top-0 right-0 bottom-0 left-0">
      <div
        className="absolute top-[-5px] right-[-5px] bottom-[-5px] left-[-5px] rounded-[11px] opacity-20 border-4 border-solid"
        style={{ borderColor: color }}
      />
      <div
        className={`absolute  right-0 px-2 rounded-sm text-white text-xs leading-5 h-5 ${coverImg ? "bottom-[-29px]" : "top-[-29px]"}`}
        style={{ background: color }}
      >
        {name}
      </div>
    </div>
  );
}

export function Selections({ id , coverImg }: { id: string , coverImg? : boolean }) {
  const COLORS = [
      "#E57373",
      "#9575CD",
      "#4FC3F7",
      "#81C784",
      "#FFF176",
      "#FF8A65",
      "#F06292",
      "#7986CB",
  ];

  const users = useOthers();
  const [myPresence] = useMyPresence();
  return (
      <>
          {users.map(({ connectionId, info, presence }) => {
              if (presence?.focusedId === id) {
                  return (
                      <Selection
                          key={connectionId}
                          name={info?.name || `User ${connectionId}`}
                          color={COLORS[connectionId % COLORS.length]}
                          coverImg = {coverImg}
                      />
                  );
              }
              return null;
          })}
          {myPresence?.focusedId === id && (
              <Selection
                  key="me"
                  name="You"
                  color="#000000" // Color for current user
                  coverImg = {coverImg}
              />
          )}
      </>
  );
}

