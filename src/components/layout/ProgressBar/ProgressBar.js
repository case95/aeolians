import React, { useEffect } from "react";
import useStorage from "../../../hooks/useStorage";

const ProgressBar = ({
  file,
  accommodationDetails,
  setAccomodationDetails,
  index,
}) => {
  const { url, progress } = useStorage(file);
  useEffect(() => {
    if (url) {
      const { pictures } = accommodationDetails;
      const newArray = [...pictures];
      newArray[index] = url;
      setAccomodationDetails({
        ...accommodationDetails,
        pictures: [...newArray],
      });

      console.log("CHANGED PICS", pictures);
    }
  }, [url]);

  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: progress + "%" }}
      >
        Progress
      </div>
    </div>
  );
};

export default ProgressBar;
