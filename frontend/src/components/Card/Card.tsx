import { RiDownloadLine } from "react-icons/all";
import { useState } from "react";

import { ImagePayload } from "../../interfaces/imagePayload";
import "./Card.css";

export const Card = ({
  author,
  id,
  url,
  download_url,
  height,
  width,
  setFullScreenImage,
}: ImagePayload) => {
  return (
    <div className="image-wrapper">
      <img
        loading="lazy"
        src={download_url}
        width={width}
        height={height}
        alt={download_url}
        onClick={() => setFullScreenImage(download_url)}
      />
      <div className="hover-footer">
        <div className="author">{author}</div>
        <a
          rel="noreferrer"
          href={download_url}
          className="image-download"
          download
          target="_blank"
        >
          <RiDownloadLine color="white" size="24px" />
        </a>
      </div>
    </div>
  );
};
