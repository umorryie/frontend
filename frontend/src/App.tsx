import { useEffect, useState } from "react";
import React from "react";

import "./App.css";
import { getImageData } from "./dataProvider/dataProvider";
import { CardList } from "./components/CardList/CardList";
import { ImagePayload } from "./interfaces/imagePayload";
import { FullScreenImage } from "./components/FullScreenImage/FullScreenImage";

function App() {
  const limit = "30";
  const [imageList, setImageList] = useState<Array<ImagePayload>>([]);
  const [page, setPage] = useState(1);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const setImageData = async () => {
    const data = await getImageData(page, limit);
    setImageList(imageList.concat(data));
    setPage(page + 1);
  };

  useEffect(() => {
    const loader = document.querySelector(".loader");

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setImageData();
        }
      });
    });
    io.observe(loader as Element);

    return () => {
      io.unobserve(loader as Element);
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
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default App;
