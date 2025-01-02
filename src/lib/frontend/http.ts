import axios from "axios";

export async function fetchProfileData() {
  const res = await axios.get("/api/getUserData");
  const data = res.data.profileInfo;

  if (res.status !== 200) {
    throw new Error("Failed to fetch data.");
  }

  return data;
}

export async function updateProfileData(data: any) {
  const res = await axios.post("/api/getUserData", data);

  if (res.status !== 201) {
    return false;
  }

  return true;
}
