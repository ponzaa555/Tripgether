"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { PlanTrip, TripContentType } from "../models/components/Blog";
import { nanoid } from "nanoid";
import { string } from "zod";

interface RoomProps {
    children:ReactNode;
    roomId : string;
    fallback : ReactNode;
    userId : string
}

export function Room({ children , roomId , fallback , userId}:RoomProps) {
  return (
    <LiveblocksProvider 
    authEndpoint={async () => {
      const response = await fetch("/api/liveblocks-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: {userId},
          roomId: {roomId} // Replace with your actual body data
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      return response.json();
    }} >
      <RoomProvider id={roomId}
      initialPresence={{
        cursor:null,
        selection:[]
      }}
      initialStorage={{
        layers: new LiveMap([
          [
              "Describtion", 
              new LiveObject({
                  type: TripContentType.Describtion,
                  describtion: ""
              })
          ],
          [
             "Hastag", 
              new LiveObject({
                type : TripContentType.Hastag,
                HastagList:[],
              }),
          ],
          [
            "CoverImg",
            new LiveObject({
              type : TripContentType.CoveImg,
              imgUrl: null,
            }),
          ],
          [
            "Budget",
            new LiveObject({
              type : TripContentType.Budget,
              stDate : "" ,
              endDate: "",
              budget: 0,
            }),
          ],
          [
            "Album",
          new LiveObject({
            type :  TripContentType.Album,
            albumList: [],
          })
        ],
        [
          "GoogleMark",
          new LiveObject({
            type : TripContentType.GoogleMark,
            ListMark : [],
          }),
        ],
      ]),
        layerIds: new LiveList(["Describtion","Hastag","CoverImg","Budget","Album","GoogleMark"])
      }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}