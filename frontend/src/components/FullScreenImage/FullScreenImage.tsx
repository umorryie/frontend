import { FullScreen } from "../../interfaces/imagePayload";
import "./FullScreenImage.css";

export const FullScreenImage = ({ src, setFullScreenImage }: FullScreen) => {
  const resetFullScreen = () => setFullScreenImage("");
  return src ? (
    <div className="full-screen-image" onClick={resetFullScreen}>
      <div className="img-center">
        <img src={src} alt="" onClick={resetFullScreen} />
      </div>
    </div>
  ) : null;
};
