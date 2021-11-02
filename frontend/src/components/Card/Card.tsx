import { HiOutlineDownload } from "react-icons/all";

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
  const [showFooter, setShowFooter] = useState(false);

  return (
    <div className="image-wrapper">
      <img
        src={download_url}
        alt={download_url}
        onClick={() => setFullScreenImage(download_url)}
        onMouseOver={() => setShowFooter(true)}
        onMouseLeave={() => setShowFooter(false)}
      />
      {showFooter ? (
        <div className="hover-footer">
          <div className="author">{author}</div>
          <a
            rel="noreferrer"
            href={download_url}
            className="image-download"
            download
            target="_blank"
          >
            <HiOutlineDownload color="white" />
          </a>
        </div>
      ) : null}
    </div>
  );
};
