import { v } from "convex/values"




export type BlogDb = {
    blogName : string;
    authorId : string;
    teamMate : string[];
    stDate : string;
    coverImgUrl :  string | undefined;
    endDate : string;
}



export enum AllNote{
    Booking,
    Note,
    Transport,
    Expens,
    Photo,
}
export type Transport = {
    noteType : AllNote.Transport,
    transportType : number,
    describtion : string,
}

export enum TripContentType {
    Describtion,
    Hastag,
    Destination
}


export type Note = {
    noteType : AllNote.Note,
    describtion : string,
}
export type DayTrips = {
    day : string,
    Date : Date,
    ListDestination : Destination[]
}

export type AllNoteType = Transport | Note

export type Describtion = {
    type : TripContentType.Describtion;
    describtion : string;
}

export type Destination = {
    type:TripContentType.Destination;
    order :number;
    place : string;
    noteList : AllNote[]
}

export type Hastag = {
    type : TripContentType.Hastag;
    HastagList : string[]
}

export type PlanTrip = Describtion | Destination | Hastag




export type DropDownListType = {
    title : string
    listContent : DropDownItemType[]
}

export type DropDownItemType = {
    key : string;
    content : string;
}




