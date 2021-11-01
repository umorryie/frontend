import { useState, useEffect } from "react";

import { ImagePayload, ImagePayloadData } from "../../interfaces/imagePayload";
import { Card } from "../Card/Card";
import "./CardList.css";

export const CardList = ({
  imageListPayloads,
  setFullScreenImage,
}: ImagePayloadData) => {
  const [xSize, setXSize] = useState(window.innerWidth);
  const updateSize = () => setXSize(window.innerWidth);
  useEffect(() => (window.onresize = updateSize), []);

  const chuckedArray = chunkArray(
    imageListPayloads,
    imageListPayloads.length / (xSize < 1100 ? 2 : 3)
  );
  const renderedChunkedCards = chuckedArray.map((chunkedSubArray, index1) => {
    return (
      <div className="column" key={index1}>
        {chunkedSubArray.map((imagePayload, index2) => {
          return (
            <Card
              setFullScreenImage={setFullScreenImage}
              key={index2}
              id={imagePayload.id}
              author={imagePayload.author}
              download_url={imagePayload.download_url}
              url={imagePayload.url}
              width={imagePayload.width}
              height={imagePayload.height}
            ></Card>
          );
        })}
      </div>
    );
  });

  return <div className="row">{renderedChunkedCards}</div>;
};

function chunkArray(
  myArray: Array<ImagePayload>,
  chunk_size: number
): Array<Array<ImagePayload>> {
  const arrayLength = myArray.length;
  let tempArray = [];

  for (let index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }

  return tempArray;
}
