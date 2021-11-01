import { ImagePayload } from "../../interfaces/imagePayload";

export const Card = ({
  author,
  id,
  url,
  download_url,
  height,
  width,
}: ImagePayload) => {
  return <div>{author}</div>;
};
