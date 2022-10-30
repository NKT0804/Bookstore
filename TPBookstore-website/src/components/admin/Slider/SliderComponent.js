import React, { useState } from "react";
import CreateSlider from "./CreateSlider";
import SliderTable from "./SliderTable";
import UpdateSlider from "./UpdateSlider";

const SliderComponent = () => {
  const [isEditSlider, setIsEditSlider] = useState(false);
  const [currentSlider, setCurrentSlider] = useState("");

  const handleEditSlider = () => setIsEditSlider(true);

  const handleCurrentSlider = (slider) => {
    setCurrentSlider(slider);
  };
  return (
    <>
      <div className="content-header">
        <h2 className="content-title">Slider</h2>
      </div>

      <div className="row">
        <div className="card shadow-sm p-3 pb-3 mb-3">
          {/* Create slider or Update slider*/}
          {isEditSlider ? (
            <UpdateSlider currentSlider={currentSlider} setIsEditSlider={setIsEditSlider} />
          ) : (
            <CreateSlider />
          )}
        </div>
        <div className="card p-3">
          <SliderTable
            setIsEditSlider={setIsEditSlider}
            handleEditSlider={handleEditSlider}
            handleCurrentSlider={handleCurrentSlider}
          />
        </div>
      </div>
    </>
  );
};

export default SliderComponent;
