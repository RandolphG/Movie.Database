import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { animated, useSpring } from "react-spring";
import { fetchDetails, fetchMovie } from "./_redux/actions/fetchData";
import { useSelector } from "react-redux";
import { Container } from "./Container";
import { useSlider } from "./UseSlider";
import { Button } from "./Button";
import { Header } from "./Header";
import { HeaderItem } from "./ScreenModalContent/HeaderItem";
import { Slider } from "./Slider";
import { ScreenModal } from "./ScreenModal";
import { ScreenModalContent } from "./ScreenModalContent";
import { Footer } from "./Footer";
import "./image.scss";

Container.defaultProps = {
  as: "div",
};

/**
 * the main component
 * @returns {*}
 * @constructor
 */
const Screen = () => {
  const results = useSelector((state) => state.movies.results);
  const details = useSelector((state) => state.movies.details);
  const [current, setCurrent] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef();

  // // slider
  const slider = useSlider({
    data: results,
    onChange: setCurrent,
    ref,
    onClick: (set, index, event) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      // window size
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

  // close modal
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
  // bool for closed and open
  const mainSpring = useSpring({
    from: { x: 0 },
    x: !isOpened ? 1 : 0,
  });

  // lifecycle hook
  useEffect(() => {
    fetchMovie();
    fetchDetails(results[current].id);
  }, [current]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const data = results[current];
  console.log(
    `------ current index[${current}] ------\n`,
    `results : `,
    results[current],
    `details : `,
    details
  );

  return (
    <section className="events-screen">
      <Container
        as={animated.div}
        className="nav-bar"
        style={{
          opacity: mainSpring.x.interpolate({ range: [1, 1], output: [1, 1] }),
          transform: mainSpring.x
            .interpolate({
              range: [0, 1],
              output: [-100, 0],
            })
            .interpolate((x) => `translate3d(0, ${x}%, 0`),
        }}
      >
        <Button className="nav-bar__back">BACK</Button>
      </Container>
      <Header data={results} index={current} as={HeaderItem} />
      <div className="events-screen__slider">
        <Slider data={data} slider={slider} />
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
  return (
    <div>
      <div className="app-layout">{children}</div>
    </div>
  );
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
