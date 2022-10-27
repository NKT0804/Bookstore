import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  {
    url: "../images/sliders/slide-img1.png",
    caption: "Slide 1"
  },
  {
    url: "../images/sliders/slide-img2.png",
    caption: "Slide 2"
  },
  {
    url: "../images/sliders/slide-img3.png",
    caption: "Slide 3"
  },
  {
    url: "../images/sliders/slide-img4.png",
    caption: "Slide 4"
  },
  {
    url: "../images/sliders/slide-img5.png",
    caption: "Slide 5"
  },
  {
    url: "../images/sliders/slide-img6.png",
    caption: "Slide 6"
  }
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <div className="grid wide">
        <div className="row">
          <div className="col l-7">
            <Fade>
              {slideImages.map((slideImage, index) => (
                <div className="slide-container__img">
                  <div className="each-slide" key={index}>
                    {/* <div style={{ 'backgroundImage': `url(${slideImage.url})` }}>
            </div> */}
                    <img src={slideImage.url} alt={slideImage.caption} />
                  </div>
                </div>
              ))}
            </Fade>
          </div>
          <div className="col l -5">
            <div className="detail-slide">
              <div>
                <img className="detail-slide__img" src="../images/sliders/slide-img5.png" alt=""></img>
              </div>
              <div>
                <img className="detail-slide__img" src="../images/sliders/slide-img4.png" alt=""></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slideshow;
