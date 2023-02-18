import React from "react";
import AppContext from "../../Context";
import { ArrowRightSVG, ArrowLeftSVG } from "../SVG/Icons";
import { useRef, useEffect, useState, useContext } from "react";

const Carosual = () => {
  const slideRef = useRef();
  const goLeft = useRef();
  const goRight = useRef();
  const [turn, setTurn] = useState(false);
  const { homePageCarosualArrImgs } = useContext(AppContext);
  const handleMoveSlide = (e) => {
    const carosual = slideRef.current;
    const width = carosual.clientWidth;
    const carosualFullWidth = (carosual.scrollWidth - width) * -1;
    const name = e.target.name;
    name === "right"
      ? (carosual.scrollLeft -= width)
      : (carosual.scrollLeft += width);
    if (carosual.scrollLeft === carosualFullWidth) {
      setTurn(true);
    } if (carosual.scrollLeft === 0) {
      setTurn(false);
    }
  };
  useEffect(() => {
    let scrollSlide = setTimeout(function slide() {
      const right = goRight.current;
      const left = goLeft.current;
      turn ? left.click() : right.click();
      scrollSlide = setTimeout(slide, 3500);
    }, 3500);
    return () => {
      clearTimeout(scrollSlide);
    };
  }, [turn]);
  return (
    <article className="carosual-container">
      <button
        ref={goRight}
        className="carosual-btn btn-right"
        name="right"
        onClick={(e)=>handleMoveSlide(e)}
      >
        <ArrowRightSVG className="svg" />
      </button>
      <button
        ref={goLeft}
        className="carosual-btn btn-left"
        name="left"
        onClick={handleMoveSlide}
      >
        <ArrowLeftSVG className="svg" />
      </button>
      <div ref={slideRef} className="carsual-inner-container">
        {
          Array.from(homePageCarosualArrImgs).map(img =>{
            return (
              <div className="slide" style={{ backgroundImage: `url(${img})` }} key={Math.random()}>
              </div>
            )
          })
        }
      </div>
    </article>
    
  );
};

export default Carosual;
