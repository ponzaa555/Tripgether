import { prisma } from "@/lib/backend/prisma";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt"

export async function FindUserByEmail(email:string):Promise<User|null>
{
    //find user
    const user = await prisma.user.findUnique({
        where:{
            email:email,
        }
    })
    // ไม่มี error เลยใส่
    if(!user) return null;
    return user
}

export async function CheckPassword(password:string , encryptPassword :string|null) : Promise<boolean>
{
    // ไม่มีทาง
    if(!encryptPassword) throw new Error('Password encryption failed or is missing');

    var checkPassword = await bcrypt.compare(password,encryptPassword);
    return checkPassword;
}
