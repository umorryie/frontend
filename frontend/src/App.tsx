import { useEffect, useState } from "react";

import "./App.css";
import { getImageData } from "./dataProvider/dataProvider";
import { CardList } from "./components/CardList/CardList";
import { ImagePayload } from "./interfaces/imagePayload";
import { FullScreenImage } from "./components/FullScreenImage/FullScreenImage";

function App() {
  const [imageList, setImageList] = useState<Array<ImagePayload>>([]);
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("100");
  const [fullScreenImage, setFullScreenImage] = useState("");

  useEffect(() => {
    const setImageData = async () => {
      const data = await getImageData(page, limit);
      setImageList(data);
    };
    setImageData();
  }, [page, limit]);

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
