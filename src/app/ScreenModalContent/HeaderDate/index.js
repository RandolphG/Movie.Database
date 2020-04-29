import React from "react";

/**
 * returns the header section text for date
 * @param data
 * @returns {*}
 * @constructor
 */
export const HeaderDate = ({ data }) => (
  <time className="header__date">{data.release_date}</time>
);
