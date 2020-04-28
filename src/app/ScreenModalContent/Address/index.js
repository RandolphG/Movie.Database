import React from "react";

/**
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const Address = ({ data }) => (
  <div>
    <address className="header__address">
      <i className="fas fa-map-marker-alt" />
      {data.place}
    </address>
  </div>
);
