import { useSpring } from "react-spring";
import React from "react";
import { ScreenModalRoot } from "./ScreenModalRoot";
import { ScreenModalTopBar } from "./ScreenModalTopBar";
import { ScreenModalContainer } from "./ScreenModalContainer";
import { Button } from "../Button";

/**
 *
 * @param onClose
 * @param isOpen
 * @param children
 * @returns {*}
 * @constructor
 */
export const ScreenModal = ({ onClose, isOpen, children }) => {
  const mainSpring = useSpring({
    from: { x: 0 },
    x: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "" : "none",
  });

  const contentSpring = useSpring({
    from: { x: 0 },
    x: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "" : "none",
    config: { duration: 400 },
  });

  return (
    <ScreenModalRoot mainSpring={mainSpring}>
      <ScreenModalTopBar mainSpring={mainSpring}>
        <Button className="nav-bar__back" onClick={onClose}>
          BACK
        </Button>
      </ScreenModalTopBar>
      <ScreenModalContainer
        mainSpring={mainSpring}
        contentSpring={contentSpring}
        children={children}
      />
    </ScreenModalRoot>
  );
};
