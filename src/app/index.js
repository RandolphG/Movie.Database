import React from "react";
import "./index.scss";
import { animated, useSpring } from "react-spring";
import { pages } from "./_data";

import { Container } from "./Container";
import { useSlider } from "./UseSlider";
import { Button } from "./Button";
import { Header } from "./Header";
import { HeaderItem } from "./ScreenModalContent/HeaderItem";
import { Slider } from "./Slider";
import { ScreenModal } from "./ScreenModal";
import { ScreenModalContent } from "./ScreenModalContent";
import { Footer } from "./Footer";

// import { LikeBtn } from "./LikeBtn";
// import { Text } from "./Text";

Container.defaultProps = {
  as: "div",
};

/**
 *
 * @returns {*}
 * @constructor
 */
const Screen = () => {
  const [current, setCurrent] = React.useState(0);
  const [isOpened, setIsOpened] = React.useState(false);
  const ref = React.useRef();
  const slider = useSlider({
    data: pages,
    onChange: setCurrent,
    ref,
    onClick: (set, index, event) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();

      const ws = window.innerWidth / el.offsetWidth;
      const hs = window.innerHeight / el.offsetHeight;

      set((i) => {
        if (index === i) {
          setIsOpened(true);

          return {
            x: window.innerWidth / 2 - rect.width / 2 - rect.x,
            y: window.innerHeight / 2 - rect.height / 2 - rect.y,
            sc: Math.max(ws, hs),
            pointerEvents: "none",
            transformOrigin: "center center",
          };
        }
      });
    },
  });

  const onCloseClick = () => {
    slider.set((i) => {
      if (i === current) {
        setIsOpened(false);
        return {
          ...slider.getStartData(0),
          transformOrigin: "center center",
        };
      }
    });
  };

  /**
   *
   * @type {AnimatedValue<ForwardedProps<OverwriteKeys<object, React.CSSProperties>>>}
   */
  const mainSpring = useSpring({
    from: { x: 0 },
    x: !isOpened ? 1 : 0,
  });

  const data = pages[current];

  return (
    <section className="events-screen">
      <Container
        as={animated.div}
        className="nav-bar"
        style={{
          opacity: mainSpring.x.interpolate({ range: [0, 1], output: [0, 1] }),
          transform: mainSpring.x
            .interpolate({
              range: [0, 1],
              output: [-100, 0],
            })
            .interpolate((x) => `translate3d(0, ${x}%, 0`),
        }}
      >
        <Button className="nav-bar__back">
          <i className="fas fa-long-arrow-alt-left" />
        </Button>
      </Container>
      <Header data={pages} index={current} as={HeaderItem} />
      <div className="events-screen__slider">
        <Slider slider={slider} />
      </div>
      <ScreenModal onClose={onCloseClick} isOpen={isOpened}>
        <ScreenModalContent key={data.id} data={data} />
      </ScreenModal>
      <Footer />
      <Container />
    </section>
  );
};

/**
 *
 * @param children
 * @returns {*}
 * @constructor
 */
const AppLayout = ({ children }) => {
  return <div className="app-layout">{children}</div>;
};

/**
 *
 * @returns {*}
 * @constructor
 */
export default function MovieCard() {
  return (
    <AppLayout>
      <Screen />
    </AppLayout>
  );
}
