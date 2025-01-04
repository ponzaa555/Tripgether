import axios from "axios";
import { mapProfileData } from "@/src/lib/utils";
import { ProfileProps } from "@/src/models/user/profile";

export async function fetchProfileData(): Promise<ProfileProps> {
  const res = await axios.get("/api/getUserData");
  const data = res.data.profileInfo;

  if (res.status !== 200) {
    throw new Error("Failed to fetch data.");
  }

  return mapProfileData(data);
}

export async function updateProfileData(data: any) {
  const res = await axios.post("/api/getUserData", data);

  if (res.status !== 201) {
    return false;
  }

  return true;
}
