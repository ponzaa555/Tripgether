"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { Album, CoveImg, DayTrips } from "@/src/models/components/Blog";
import { date } from "zod";

import { nanoid } from "nanoid";
import { Liveblocks } from "@liveblocks/node";
import { LiveList, LiveMap, LiveObject, toPlainLson } from "@liveblocks/client";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_H_SVLGhBIhjIzXG8-sx5qe2wOKPmn-2B-yspdt-P9hDv22sOGpFMeUEyfeT3YWo7",
});

export const GetRoomStorage = async (roomId: string) => {
  try {
    const LIVEBLOCKS_SECRET_KEY =
      "sk_dev_H_SVLGhBIhjIzXG8-sx5qe2wOKPmn-2B-yspdt-P9hDv22sOGpFMeUEyfeT3YWo7";
    const response = await fetch(
      `https://api.liveblocks.io/v2/rooms/${roomId}/storage`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${LIVEBLOCKS_SECRET_KEY}`,
        },
      }
    );
    const data = await response.json();
    return { status: response.status, storage: data };
  } catch (error) {
    console.log({ error });
    return { status: 400, error: error };
  }
};

export async function PostRoomStorageMongo(
  roomId: string,
  layer: Prisma.JsonValue
) {
  try {
    const response = await prisma.blog.create({
      data: {
        roomId: roomId,
        layers: { blog: layer },
      },
    });
    return { status: 200, msg: "Success" };
  } catch (error) {
    return { status: 400, msg: error };
  }
}

export async function GetBlogMongoDb(roomId: string) {
  console.log({ roomId: roomId });
  try {
    const respose = await prisma.blog.findFirst({
      where: {
        roomId: roomId,
      },
    });
    // console.log(JSON.stringify(respose, null, 2));
    const blog = respose?.layers;
    // console.log(blog)
    const { layers, layerIds } = blog.blog;
    // console.log({layerIds})
    const listId: string[] = layerIds.data;
    console.log(listId);
    // console.log({layers})
    const data = layers.data;
    // console.log({data})
    let coverImage, hastagList, describtion, budget;
    let listAlbum: Album[] = [];
    const listDate: DayTrips[] = [];
    let listMark;

    listId.map((storageId: string) => {
      // console.log(storageId, data[storageId].data);
      if (storageId === "CoverImg") {
        const coverImagelayer = data[storageId].data;
        coverImage = coverImagelayer.imgUrl;
      } else if (storageId === "Hastag") {
        const hastagLayer = data[storageId].data;
        hastagList = hastagLayer.HastagList;
      } else if (storageId === "Describtion") {
        const describtionLayer = data[storageId].data;
        describtion = describtionLayer.describtion;
      } else if (storageId === "Budget") {
        budget = data[storageId].data;
      } else if (storageId === "Album") {
        const album = data[storageId].data;
        listAlbum = album.albumList.map(
          (item: {
            name: string;
            describtion: string;
            listUrl: { url: string }[];
          }) => ({
            name: item.name,
            describtion: item.describtion,
            listUrl: item.listUrl.map((urlItem) => urlItem.url),
          })
        );
      } else if (storageId === "GoogleMark") {
        listMark = data[storageId].data.ListMark;
      } else {
        const dayLayer = data[storageId].data;
        listDate.push(dayLayer);
      }
    });

    const PlanInfo = {
      coverImage: coverImage,
      hastagList: hastagList,
      describtion: describtion,
      listAlbum: listAlbum,
      listDate: listDate,
      budget: budget,
      listMark: listMark,
    };
    return { status: 200, blog: PlanInfo };
  } catch (error) {
    return { status: 400, error: error };
  }
}

export async function CreateRoom(refRoomId: string ,roomId :string ) {
  // const id = nanoid();
  try {
    const room = await liveblocks.createRoom(roomId, {
      defaultAccesses: [],
    });
    // clone storage
    const cloneStorage = await GetRoomStorage(refRoomId);
    const roomInfo = cloneStorage.storage.data;
    const layerIds = roomInfo.layerIds.data;
    const layer = roomInfo.layers.data;
    const listLayer = [];
    for (const key in layer) {
      if (layer.hasOwnProperty(key)) {
        console.log("key : ", key);
        const element = layer[key];
        console.log("element : ", element);
        listLayer.push([key,element]);
      }
    }
    const initialStorage: LiveObject<Liveblocks["Storage"]> = new LiveObject({
      layerIds: new LiveList([...layerIds]),
      layers: new LiveMap(listLayer),
    });
    const storage = await liveblocks.initializeStorageDocument(
      roomId,
      toPlainLson(initialStorage)
    );
    return room
    return;
  } catch (error) {
    console.log({ error });
    return { status: 400, error: error };
  }
}
