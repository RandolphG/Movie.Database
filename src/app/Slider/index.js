import { animated } from "react-spring";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const R = require("ramda");

/**
 *
 * @param slider
 * @param data
 * @returns {*}
 * @constructor
 */
export const Slider = ({ slider, data }) => {
  const imgUri = `https://image.tmdb.org/t/p/w500`;
  const { map, ref } = slider;
  return (
    <div className="slider" ref={ref}>
      <div className="slider__container">
        {map(({ root, inner, onClick, item, itemRef }) => {
          return (
            // <div className="outline #border">
            <animated.div
              ref={itemRef}
              className="slider__item"
              // onClick={onClick}
              {...root}
            >
              <animated.div className="slider__inner" {...inner}>
                <div className="carousel-box card">
                  <div
                    className="wrapper"
                    style={{
                      backgroundImage: `url(${imgUri}${R.path(["poster_path"])(
                        item
                      )})`,
                    }}
                  >
                    <div className="date">
                      <span className="day">12</span>
                      <span className="month">Aug</span>
                      <span className="year">2016</span>
                    </div>
                    <div className="data">
                      <div className="content">
                        <span className="author">NAME</span>
                        <h1 className="title">
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href="#">{data.title}</a>
                        </h1>
                        <p className="text">{data.overview}</p>
                        <label htmlFor="show-menu" className="menu-button">
                          <span />
                        </label>
                      </div>
                      {/*<input type="checkbox" id="show-menu" />*/}
                      <ul className="menu-content">
                        <li>
                          <a href="#">
                            <FontAwesomeIcon icon={faBookmark} />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <FontAwesomeIcon icon={faHeart} />
                            <span>47</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <FontAwesomeIcon icon={faComment} />

                            <span>8</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </animated.div>
            </animated.div>
            // </div>
          );
        })}
      </div>
    </div>
  );
};
