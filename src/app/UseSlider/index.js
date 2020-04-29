import { interpolate, useSprings } from "react-spring";
import { useGesture } from "react-use-gesture";
import { useState } from "react";
const R = require("ramda");

const MAX_COUNT = 3;

/**
 *
 * @param index
 * @param down
 * @param isNextTrigger
 * @param getStartData
 * @param onChange
 * @param ref
 * @param drag
 * @param i
 * @returns {{[p: string]: *}}
 */
const onNext = (
  { args: [index], down },
  { isNextTrigger, getStartData, onChange, ref, drag },
  i
) => {
  if (!isNextTrigger || down) {
    return;
  }
  if (index === i) {
    return {
      ...getStartData(i),
      x: -ref.current.offsetWidth,
      sc: 1,
      opacity: 1,
      immediate: false,
      onStart: () => {
        onChange(index + 1);
      },
      onRest: () => {
        drag.cancel();
      },
    };
  }
  if (i - index > 0) {
    const currentIndex = i - index - 1;
    return {
      ...getStartData(currentIndex),
      immediate: false,
      onStart: undefined,
      onRest: undefined,
    };
  }
};

/**
 *
 * @param index
 * @param down
 * @param isPrevTrigger
 * @param getStartData
 * @param onChange
 * @param drag
 * @param i
 * @returns {{[p: string]: *}}
 */
const onPrev = (
  { args: [index], down },
  { isPrevTrigger, getStartData, onChange, drag },
  i
) => {
  if (!isPrevTrigger || down) {
    return;
  }

  if (index > 0 && i - index >= -1 && isPrevTrigger) {
    const currentIndex = i - index + 1;
    let indexConf = {
      onStart: undefined,
      onRest: undefined,
    };
    if (index === i) {
      indexConf.onStart = () => {
        onChange(index - 1);
      };
      indexConf.onRest = () => {
        drag.cancel();
      };
    }
    return {
      ...getStartData(currentIndex),
      immediate: false,
      ...indexConf,
    };
  }
};

/**
 *
 * @param index
 * @param data
 * @param i
 * @returns {{onStart: undefined, onRest: undefined}}
 */
const isNotTarget = ({ args: [index] }, data, i) => {
  if (index !== i) {
    return {
      onStart: undefined,
      onRest: undefined,
    };
  }
};

/**
 *
 * @param down
 * @param drag
 * @returns {{immediate: boolean, x: number, onRest: onRest}}
 */
const isNotDown = ({ down }, { drag }) => {
  if (down) {
    return;
  }
  return {
    x: 0,
    immediate: false,
    onRest: () => {
      drag.cancel();
    },
  };
};

/**
 *
 * @param movement
 * @returns {{onStart: undefined, immediate: boolean, x: *, reset: boolean, onRest: undefined}}
 */
const onDefault = ({ movement }) => ({
  x: movement[0],
  immediate: true,
  reset: false,
  onStart: undefined,
  onRest: undefined,
});

/**
 *
 * @returns {{cancel: cancel, state: {}, setIsDrag: setIsDrag}}
 */
const useIsDrag = () => {
  const [state] = useState({});
  const setIsDrag = (movement) => {
    const xMod = Math.abs(movement[0]);
    if (xMod > 2) {
      state.isDrag = true;
    }
  };
  const cancel = () => {
    state.isDrag = false;
  };
  return {
    state,
    setIsDrag,
    cancel,
  };
};

/**
 *
 * @param data
 * @param onChange
 * @param ref
 * @param onClick
 * @returns {{ref: *, set: ForwardedProps<React.CSSProperties>, map: (function(*): *), getStartData: (function(*): {sc: number, boxShadow: string, display: string, pointerEvents: string, x: number, width: string, y: number, position: string, transformOrigin: string, opacity: number, height: string})}}
 */
export const useSlider = ({ data, onChange, ref, onClick }) => {
  const totalItems = data.length;
  const drag = useIsDrag();
  const getStartData = (i) => {
    const isVisible = i <= MAX_COUNT - 1;
    const multiplier = i === 0 ? 1 : 1.1;
    return {
      x: isVisible ? (i * 28) / multiplier : (MAX_COUNT - 1) * 28,
      y: 0,
      sc: isVisible
        ? 1 / (MAX_COUNT / (MAX_COUNT * multiplier - i))
        : 1 / MAX_COUNT,
      opacity: isVisible ? 1 / (MAX_COUNT / (MAX_COUNT - i)) : 0,
      display: "block",
      pointerEvents: i === 0 ? "" : "none",
      boxShadow:
        i === 0
          ? "0 10px 40px rgba(0, 0, 0, .2)"
          : "0 0px 0px rgba(0, 0, 0, .2)",
      position: "",
      transformOrigin: "",
      width: "",
      height: "",
    };
  };
  /**
   *
   */
  const [props, set] = useSprings(totalItems, getStartData);

  /**
   *
   * @type {(...args: any[]) => HookReturnType<UseGestureConfig>}
   */
  const bind = useGesture({
    onDrag: (state) => {
      const {
        args: [index],
        down,
        movement,
        cancel,
      } = state;
      const isNextTrigger = movement[0] <= -100 && index !== totalItems - 1;
      const isPrevTrigger = movement[0] >= 54;
      const data = {
        isNextTrigger,
        isPrevTrigger,
        getStartData,
        onChange,
        ref,
        drag,
      };

      if (down) {
        drag.setIsDrag(movement);
      }

      if ((isNextTrigger || isPrevTrigger) && down) {
        cancel(index);
      }

      set((i) => {
        const action = R.find(
          (fn) => {
            return fn(state, data, i);
          },
          [onNext, onPrev, isNotTarget, isNotDown, onDefault]
        );

        if (action) {
          return action(state, data, i);
        }
      });
    },
  });

  /**
   *
   * @param component
   * @returns {*}
   */
  const map = (component) => {
    return props.map(
      (
        { x, y, display, sc, opacity, pointerEvents, boxShadow, ...rest },
        i
      ) => {
        // change the Z index of img
        const root = {
          key: i,
          style: {
            display,
            transform: interpolate(
              [x, y, sc],
              (x, y, s) => `translate3d(${x}px, ${y}px, 0) scale(${s})`
            ),
            opacity,
            pointerEvents,
            zIndex: data.length - i,
            ...rest,
          },
          ...bind(i),
        };
        const inner = {
          style: {
            boxShadow,
          },
        };

        const onClickHandler = (...args) => {
          if (drag.state.isDrag) {
            console.log("onClickHandler : dragging : ", drag.state.isDrag);
            return;
          }

          onClick(set, i, ...args);
        };
        return component({
          root,
          inner,
          ref,
          item: data[i],
          onClick: onClickHandler,
        });
      }
    );
  };
  return {
    map,
    ref,
    set,
    getStartData,
  };
};
