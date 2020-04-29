import React from "react";

/**
 * returns head section text for directors
 * @param data
 * @returns {*}
 * @constructor
 */
export const Subtitle = ({ data }) => {
  return (
    <div className="header__subtitle">
      <div>{data.release_date}</div>
    </div>
  );
};
