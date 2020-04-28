import React from "react";

/**
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const HeaderDate = ({ data }) => (
  <time className="header__date">{data.date}</time>
);
