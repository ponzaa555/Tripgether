import { LsonObject } from "@liveblocks/client";
import { UploadFile } from "antd";
import { v } from "convex/values";

export const ListHastag = ["#Beach", "#Mountain", "#City", "#Sea"];

export type BlogDb = {
  blogName: string;
  authorId: string;
  teamMate: string[];
  stDate: string;
  coverImgUrl: string ;
  endDate: string;
};

export enum AllNote {
  Booking,
  Note,
  Transport,
  Expens,
  Photo,
}
export type Note = {
  noteType: AllNote.Note;
  describtion: string | undefined;
};
export type Transport = {
  noteType: AllNote.Transport;
  transportType: number;
  describtion: string;
};
export type Expense = {
  noteType: AllNote.Expens;
  expenseType: number;
  describtion: string | undefined;
  cost: number | undefined;
  id: string;
};

export type ImageFile = {
  id: string;
  url: string;
};
export type Photo = {
  noteType: AllNote.Photo;
  listImage: UploadFile[];
};

export type NoteType = Note | Transport | Expense | Photo;

export enum TripContentType {
  Describtion,
  Hastag,
  Destination,
  CoveImg,
  ExpensList,
  Album,
}

export type Destination = {
  type: TripContentType.Destination;
  order: number;
  place: string;
  noteList: NoteType[];
};

export type DayTrips = {
  day: string;
  date: string;
  conclusionDay: string | undefined;
  ListDestination: Destination[];
} & LsonObject;

export type AllNoteType = Transport | Note;

export type Describtion = {
  type: TripContentType.Describtion;
  describtion: string;
} & LsonObject;

export type Hastag = {
  type: TripContentType.Hastag;
  HastagList: string[];
}& LsonObject;

export type CoveImg = {
  type: TripContentType.CoveImg;
  imgUrl: string | null;
}& LsonObject;

export type ExpenseNoteList = {
  type: TripContentType.ExpensList;
  expenseList: Expense[];
}& LsonObject;

export type PlanTrip = Describtion | Hastag | CoveImg | DayTrips | ExpenseNoteList | AlbumList;

export type DropDownListType = {
  title: string;
  listContent: DropDownItemType[];
};

export type DropDownItemType = {
  key: string;
  content: string;
};

export type AlbumList = {
  type: TripContentType.Album;
  albumList: Album[];
}& LsonObject;

export type Album = {
  name: string | undefined;
  describtion: string;
  listUrl: string[];
};

// export type DayPlans = {
//   [Dayid: string]: {
//     describetion: string;
//     datePlan: string;
//   };
// };

// export type PlaceVisite = {
//   [placeId: string]: {
//     dayPlanId: string;
//     placeName: string;
//   };
// };
// export type NotePlaceVisite = {
//   [noteId: string]: {
//     placeVisiteId: string;
//     Note: Note | Transport | Expense | Photo;
//   };
// };

// export type PlanTrip = DayPlans[] | PlaceVisite[] | NotePlaceVisite[] | Describtion | Hastag | CoveImg;
