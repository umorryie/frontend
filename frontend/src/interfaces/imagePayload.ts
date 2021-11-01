export interface ImagePayload {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface ImagePayloadData {
  imageListPayloads: ImagePayload[];
}
