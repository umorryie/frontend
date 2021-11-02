import axios from "axios";

import { imageListUrl } from "../constants";
import { ImagePayload } from "../interfaces/imagePayload";

export const getImageData = async (
  page: number,
  limit: string
): Promise<Array<ImagePayload>> => {
  try {
    const fetchedData = await axios.get(imageListUrl(page, limit));
    return fetchedData.data;
  } catch (error) {
    return [];
  }
};
