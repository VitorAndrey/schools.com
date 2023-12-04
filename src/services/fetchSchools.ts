import axios from "axios";

import { School } from "@/models";

const url = "http://localhost:3333";

export async function fetchSchools(): Promise<School[] | null> {
  try {
    const response = await axios.get(url + "/schools");
    return response.data;
  } catch (error) {
    console.error("Error while fetching schools", error);
    return null;
  }
}
