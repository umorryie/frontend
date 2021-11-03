import { useState } from "react";

import {
  ImagePayloadData,
  ModifiedImagePayload,
} from "../../interfaces/imagePayload";
import { Card } from "../Card/Card";
import "./CardList.css";

export const CardList = ({
  imageListPayloads,
  setFullScreenImage,
}: ImagePayloadData) => {
  const [xSize, setXSize] = useState(window.innerWidth);
  const updateSize = () => setXSize(window.innerWidth);
  window.addEventListener("resize", updateSize);

  const chuckedArray = chunkArray(
    imageListPayloads,
    xSize < 1076 ? 2 : xSize < 1886 ? 3 : 4
  );
  const renderedChunkedCards = chuckedArray.map((chunkedSubArray, index1) => {
    return (
      <div
        className={
          index1 === chuckedArray.length - 1 ? "column last-column" : "column"
        }
        key={index1}
      >
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
              originalDownloadUrl={imagePayload.originalDownloadUrl}
            ></Card>
          );
        })}
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{renderedChunkedCards}</div>
    </div>
  );
};

function chunkArray(
  myArray: Array<ModifiedImagePayload>,
  columnNumber: number
): Array<Array<ModifiedImagePayload>> {
  let tempArray: Array<Array<ModifiedImagePayload>> = [];

  for (let index = 0; index < columnNumber; index += 1) {
    tempArray.push([]);
  }

  // This creates columns without image hopping from one column to another on data fetch
  myArray.forEach((element, index) => {
    tempArray[index % columnNumber].push(element);
  });

  return tempArray;
}
