import { animated } from "react-spring";
import React from "react";

/**
 *
 * @param mainSpring
 * @param children
 * @returns {*}
 * @constructor
 */
export const ScreenModalRoot = ({ mainSpring, children }) => (
  <animated.div
    className="screen-modal-root"
    style={{
      pointerEvents: mainSpring.pointerEvents,
    }}
    children={children}
  />
);
