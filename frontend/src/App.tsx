import { useEffect, useState } from "react";

import "./App.css";
import { getImageData } from "./dataProvider/dataProvider";
import { CardList } from "./components/CardList/CardList";
import { ImagePayload } from "./interfaces/imagePayload";
import { FullScreenImage } from "./components/FullScreenImage/FullScreenImage";

function App() {
  const limit = "30";
  const [imageList, setImageList] = useState<Array<ImagePayload>>([]);
  const [page, setPage] = useState("1");
  const [fullScreenImage, setFullScreenImage] = useState("");

  const setImageData = async () => {
    const data = await getImageData(page, limit);
    setImageList(imageList.concat(data));
    setPage((parseInt(page) + 1).toString());
  };

  useEffect(() => {
    setImageData();
  }, []);

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
    </div>
  );
}

export default App;
