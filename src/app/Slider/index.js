import { animated } from "react-spring";
import React from "react";
const R = require("ramda");

/**
 *
 * @param slider
 * @returns {*}
 * @constructor
 */
export const Slider = ({ slider, data }) => {
  const imgUri = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  console.log(data.id);
  const { map, ref } = slider;
  return (
    <div className="slider" ref={ref}>
      <div className="slider__container">
        {map(({ root, inner, onClick, item, itemRef }) => {
          const videoSrc = R.path(["video"])(item);
          const videoPoster = R.path(["poster_path"])(item);
          {
            console.log(
              imgUri,
              `\nitem : \n`,
              item && item,
              ` \nitemRef : \n`,
              itemRef && itemRef,
              ` \nref : \n`,
              ref && ref
            );
          }
          return (
            <animated.div
              ref={itemRef}
              className="slider__item"
              onClick={onClick}
              {...root}
            >
              <animated.div
                className="slider__inner"
                {...inner}
                style={{
                  backgroundImage: `url(${imgUri})`,
                  ...inner,
                }}
              >
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
          );
        })}
      </div>
    </div>
  );
};
