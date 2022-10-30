import React, { useEffect } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { listSlider } from "../Redux/Actions/bannerActions";
const Slideshow = () => {
  const dispatch = useDispatch();
  const sliderList = useSelector((state) => state.sliderList);
  const { error, loading, sliders } = sliderList;

  useEffect(() => {
    dispatch(listSlider());
  }, [dispatch]);
  return (
    <div className="slide-container">
      <div className="grid wide">
        <div className="row">
          <div className="col l-7">
            <Fade>
              {sliders?.map((item, index) => (
                <div className="slide-container__img">
                  <div className="each-slide" key={index}>
                    <img src={item.image} alt={item.name} />
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
