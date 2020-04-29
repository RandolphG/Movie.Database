import React from "react";

/**
 * returns the component for the modal title
 * @param data
 * @returns {*}
 * @constructor
 */
export const HeaderTitle = ({ data }) => {
  return <h1 className="header__title">{data.title}</h1>;
};
