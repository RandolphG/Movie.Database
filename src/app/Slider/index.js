import { animated } from "react-spring";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faStar } from "@fortawesome/free-solid-svg-icons";
import { faVoteYea } from "@fortawesome/free-solid-svg-icons/faVoteYea";
import { fetchDetails } from "../_redux/actions/fetchData";

const R = require("ramda");

/**
 *
 * @param slider
 * @param data
 * @param details
 * @returns {*}
 * @constructor
 */
export const Slider = ({ slider, data, details }) => {
  const imgUri = `https://image.tmdb.org/t/p/w500`;
  const { map, ref } = slider;

  const query = (movieID) => {
    console.log(`the movieID is : `, movieID);
    fetchDetails(movieID);
  };

  return (
    <div className="slider" ref={ref}>
      <div className="slider__container">
        {map(({ root, inner, onClick, item, itemRef }) => {
          return (
            <animated.div ref={itemRef} className="slider__item" {...root}>
              <animated.div className="slider__inner">
                <div className="carousel-box card">
                  <div
                    onClick={(e) => query(e.target.dataset.id)}
                    data-id={data.id}
                    className="wrapper"
                    style={{
                      background: `url(${imgUri}${R.path(["poster_path"])(
                        item
                      )}) 20% 1% / cover no-repeat`,
                    }}
                  >
                    <div className="date">
                      <span className="day">12</span>
                      <span className="month">Aug</span>
                      <span className="year">2016</span>
                    </div>
                    <ul className="rate-content">
                      <li className="icon">
                        <FontAwesomeIcon className="fa" icon={faFilm} />
                        <span>20</span>
                      </li>
                      <li>
                        <FontAwesomeIcon className="fa" icon={faStar} />
                        <span>{data.vote_average}</span>
                      </li>
                      <li>
                        <FontAwesomeIcon
                          // onClick={onClick}
                          className="fa"
                          icon={faVoteYea}
                        />
                        <span>18</span>
                      </li>
                    </ul>
                    <div className="data">
                      <div className="content">
                        <span className="author">
                          runtime : {details && details.runtime}min
                        </span>
                        <h1 className="title">{data.title}</h1>
                        <p className="text">{data.overview}</p>
                        <label htmlFor="show-menu" className="menu-button">
                          <span />
                        </label>
                      </div>
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
