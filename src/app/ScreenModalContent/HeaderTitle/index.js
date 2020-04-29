import React from "react";

/**
 * returns the component for the modal title
 * @param data
 * @returns {*}
 * @constructor
 */
export const HeaderTitle = ({ data }) => (
  <h1 className="header__title">{data && data.original_title}</h1>
);
