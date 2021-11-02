import { RiDownloadLine } from "react-icons/all";
import { useRef, useEffect, useState } from "react";

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
      { threshold: 1, rootMargin: "0px" }
    );
    io.observe(imageRef?.current as Element);

    return () => {
      io.disconnect();
    };
  }, []);
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
