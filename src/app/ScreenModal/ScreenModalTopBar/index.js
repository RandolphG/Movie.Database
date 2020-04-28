import { Container } from "../../Container";
import { animated } from "react-spring";
import React from "react";

/**
 *
 * @param mainSpring
 * @param children
 * @returns {*}
 * @constructor
 */
export const ScreenModalTopBar = ({ mainSpring, children }) => (
  <Container
    as={animated.div}
    style={{
      color: "white",
      opacity: mainSpring.x.interpolate({ range: [0, 1], output: [0, 1] }),
      transform: mainSpring.x
        .interpolate({
          range: [0, 1],
          output: [100, 0],
        })
        .interpolate((x) => `translate3d(0, ${x}%, 0`),
    }}
    children={children}
  />
);
