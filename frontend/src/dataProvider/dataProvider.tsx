import axios from "axios";

import { imageListUrl } from "../constants";
import { ImagePayload, ModifiedImagePayload } from "../interfaces/imagePayload";

const displayWidth = 500;

export const getImageData = async (
  page: number,
  limit: number
): Promise<Array<ModifiedImagePayload>> => {
  try {
    const fetchedData = await axios.get(imageListUrl(page, limit));
    return fetchedData.data.map((imagePayload: ImagePayload) => {
      const ratio = displayWidth / imagePayload.width;
      imagePayload.width = Math.round(ratio * imagePayload.width);
      imagePayload.height = Math.round(ratio * imagePayload.height);
      let splitUrl = imagePayload.download_url.split("/");
      splitUrl = splitUrl.slice(splitUrl.length - 2, splitUrl.length);
      return Object.assign(imagePayload, {
        originalDownloadUrl: imagePayload.download_url,
        download_url: imagePayload.download_url.replace(
          splitUrl.join("/"),
          `${imagePayload.width}/${imagePayload.height}`
        ),
      });
    });
  } catch (error) {
    return [];
  }
};
