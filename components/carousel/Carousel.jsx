import React from "react";
import { useState } from "react";

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className="overflow-hidden h-screen relative">
      <div
        className="whitespace-nowrap"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: "transform 0.3s",
        }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="flex justify-center absolute z-50 bottom-0">
        <button
          className="m-1 z-50"
          onClick={() => updateIndex(activeIndex - 1)}
        >
          Prev
        </button>
        <button
          className="m-1 z-50"
          onClick={() => updateIndex(activeIndex + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
