import React from "react";
import { Parallax } from "react-parallax";

const Za = () => {
  return (
    <div className="flex">
      <Parallax bgImage={"./za.png"} strength={600}>
        <a target="_blank" href="https://grannyza.com/">
          <div className="container2">
            <img src="/za.png" alt="Zs" className="image2" />
            <div className="middle2">
              <div className="text2">Granny Za's Cannabis</div>
            </div>
          </div>
        </a>
      </Parallax>
    </div>
  );
};
export default Za;
