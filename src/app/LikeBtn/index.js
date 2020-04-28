import React, { useEffect } from "react";
import "./index.scss";
import { gsap } from "gsap/all";

/**
 *
 * @returns {*}
 * @constructor
 */
export const LikeBtn = () => {
  useEffect(() => {
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("click", (e) => {
        button.classList.toggle("liked");
        if (button.classList.contains("liked")) {
          gsap.fromTo(
            button,
            {
              "--hand-rotate": 8,
            },
            {
              ease: "none",
              keyframes: [
                {
                  "--hand-rotate": -45,
                  duration: 0.16,
                  ease: "none",
                },
                {
                  "--hand-rotate": 15,
                  duration: 0.12,
                  ease: "none",
                },
                {
                  "--hand-rotate": 0,
                  duration: 0.2,
                  ease: "none",
                  clearProps: true,
                },
              ],
            }
          );
        }
      });
    });
  });

  return (
    <div>
      <button className="likeButton dark">
        <div className="hand">
          <div className="thumb" />
        </div>
        <span>
          Like<span>d</span>
        </span>
      </button>
    </div>
  );
};
