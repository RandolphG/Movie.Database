import { animated } from "react-spring";
import React from "react";

/**
 *
 * @param mainSpring
 * @param contentSpring
 * @param children
 * @returns {*}
 * @constructor
 */
export const ScreenModalContainer = ({
  mainSpring,
  contentSpring,
  children,
}) => (
  <animated.div
    className="screen-modal"
    style={{
      transform: mainSpring.x
        .interpolate({
          range: [0, 1],
          output: [100, 0],
        })
        .interpolate((x) => `translate3d(0, ${x}%, 0`),
    }}
  >
    <animated.div
      className="screen-modal__scroll"
      style={{
        opacity: contentSpring.x.interpolate({ range: [0, 1], output: [0, 1] }),
        transform: contentSpring.x
          .interpolate({
            range: [0, 1],
            output: [100, 0],
          })
          .interpolate((x) => `translate3d(0, ${x}%, 0`),
      }}
    >
      {children}
    </animated.div>
  </animated.div>
);
