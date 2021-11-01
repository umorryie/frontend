export interface ImagePayload {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  setFullScreenImage: Function;
}

export interface ImagePayloadData {
  imageListPayloads: ImagePayload[];
  setFullScreenImage: Function;
}

export interface FullScreen {
  src: string;
  setFullScreenImage: Function;
}
