import { v } from "convex/values"




export type BlogDb = {
    blogName : string;
    authorId : string;
    teamMate : string[];
    stDate : string;
    coverImgUrl :  string | undefined;
    endDate : string;
}