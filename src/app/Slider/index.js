import { animated } from "react-spring";
import React from "react";
const R = require("ramda");

/**
 *
 * @param slider
 * @param data
 * @returns {*}
 * @constructor
 */
export const Slider = ({ slider }) => {
  const imgUri = `https://image.tmdb.org/t/p/w500`;
  const { map, ref } = slider;
  return (
    <div className="slider" ref={ref}>
      <div className="slider__container">
        {map(({ root, inner, onClick, item, itemRef }) => {
          const videoSrc = R.path(["video"])(item);
          const videoPoster = `${imgUri}${R.path(["poster_path"])(item)}`;

          return (
            // <div className="outline #border">
            <animated.div
              ref={itemRef}
              className="slider__item"
              onClick={onClick}
              {...root}
            >
              <animated.div
                className="slider__inner animated"
                {...inner}
                style={{
                  backgroundImage: `url(${imgUri}${R.path(["poster_path"])(
                    item
                  )})`,
                  ...inner,
                }}
              >
                {" "}
                {videoSrc && (
                  <video
                    src={videoSrc}
                    poster={videoPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </animated.div>
            </animated.div>
            // </div>
          );
        })}
      </div>
    </div>
  );
};
