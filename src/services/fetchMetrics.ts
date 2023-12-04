import axios from "axios";

const url = "http://localhost:3333";

import { Metric } from "@/models";

export async function fetchMetrics(id: string): Promise<Metric | null> {
  try {
    const response = await axios.post(url + "/metrics", {
      id_escola: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching metrics", error);
    return null;
  }
}
