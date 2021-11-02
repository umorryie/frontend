import { RiDownloadLine } from "react-icons/all";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import fileDownload from "js-file-download";

import { ModifiedImagePayload } from "../../interfaces/imagePayload";
import "./Card.css";

export const Card = ({
  author,
  id,
  url,
  download_url,
  height,
  originalDownloadUrl,
  width,
  setFullScreenImage,
}: ModifiedImagePayload) => {
  const [showBlur, setShowBlur] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowBlur(false);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px" }
    );
    io.observe(imageRef?.current as Element);

    return () => {
      io.disconnect();
    };
  }, []);

  const downloadFile = async () => {
    try {
      const imageResponse = await axios.get(originalDownloadUrl, {
        responseType: "blob",
      });
      if (imageResponse && imageResponse.data) {
        fileDownload(imageResponse.data, `file-${id}.jpg`);
      }
    } catch (error) {}
  };

  return (
    <div className="image-wrapper">
      <img
        ref={imageRef}
        loading="lazy"
        src={`${download_url}${showBlur ? "?blur" : ""}`}
        width={width}
        height={height}
        alt={download_url}
        onClick={() => setFullScreenImage(originalDownloadUrl)}
      />
      <div className="hover-footer">
        <div className="author">{author}</div>
        <div className="image-download" onClick={() => downloadFile()}>
          <RiDownloadLine color="white" size="24px" />
        </div>
      </div>
    </div>
  );
};
