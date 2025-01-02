import { Profile } from "@prisma/client";
import { prisma } from "../../../prisma";
import { ProfileMap } from "./type";


export async function GetProfileById(email:string) : Promise<ProfileMap> {
    const profile = await prisma.profile.findFirst({
        where:{
            email:email
        }
    })
    let profileDetail:ProfileMap;
    if(!profile){
        profileDetail =
        {
            firstName:"",
            email:email ,
            lastName:"",
            phoneNumber:"",
            aboutMe:""  
        }
        return profileDetail
    }
    profileDetail =  await ProfiletoMapPorfile(profile)
    return profileDetail
    
}

export async function UpsertProfile(profileInfo:ProfileMap , userId:string){
    //find user by email 
    const profile = await prisma.profile.upsert({
        where:{
            email:profileInfo.email
        },
        update:{
            firstNmae:profileInfo.firstName,
            lastName:profileInfo.lastName,
            phoneNumber:profileInfo.phoneNumber,
            birthDate:profileInfo.birthDate,
            aboutMe:profileInfo.aboutMe
        },
        create:{
            firstNmae:profileInfo.firstName,
            userId:userId,
            lastName:profileInfo.lastName,
            phoneNumber:profileInfo.phoneNumber,
            birthDate:profileInfo.birthDate,
            aboutMe:profileInfo.aboutMe,
            email:profileInfo.email,
        }
    })
    return profile
}

function ProfiletoMapPorfile(profile:Profile) : Promise<ProfileMap>
{
    const profileMap:ProfileMap = 
    {
        firstName:profile.firstNmae!,
        email:profile.email,
        lastName:profile.lastName!,
        phoneNumber:profile.phoneNumber!,
        birthDate:profile.birthDate!,
        aboutMe:profile.aboutMe!
    }
    return Promise.resolve(profileMap);
}