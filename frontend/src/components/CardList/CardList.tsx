import { ImagePayloadData } from "../../interfaces/imagePayload";
import { Card } from "../Card/Card";

export const CardList = ({ imageListPayloads }: ImagePayloadData) => {
  const renderedCards = imageListPayloads.map((imagePayload, index) => {
    return (
      <Card
        key={index}
        id={imagePayload.id}
        author={imagePayload.author}
        download_url={imagePayload.download_url}
        url={imagePayload.url}
        width={imagePayload.width}
        height={imagePayload.height}
      ></Card>
    );
  });

  return <div>{renderedCards}</div>;
};
