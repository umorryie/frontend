import { useEffect, useState, useRef } from "react";

import "./App.css";
import { getImageData } from "./dataProvider/dataProvider";
import { CardList } from "./components/CardList/CardList";
import { ModifiedImagePayload } from "./interfaces/imagePayload";
import { FullScreenImage } from "./components/FullScreenImage/FullScreenImage";

function App() {
  const limit = 20;
  const [imageList, setImageList] = useState<Array<ModifiedImagePayload>>([]);
  const [page, setPage] = useState(1);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const loadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setImageData = async () => {
      const data = await getImageData(page, limit);
      setImageList(imageList.concat(data));
      setPage(page + 1);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageData();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 1, rootMargin: "0px" }
    );
    io.observe(loadingRef?.current as Element);

    return () => {
      io.disconnect();
    };
  }, [page]);

  const renderListData = (
    <CardList
      imageListPayloads={imageList}
      setFullScreenImage={setFullScreenImage}
    ></CardList>
  );
  return (
    <div className="App">
      {renderListData}
      <FullScreenImage
        src={fullScreenImage}
        setFullScreenImage={setFullScreenImage}
      ></FullScreenImage>
      <div className="loader-wrapper">
        <div ref={loadingRef} className="loader"></div>
      </div>
    </div>
  );
}

export default App;
