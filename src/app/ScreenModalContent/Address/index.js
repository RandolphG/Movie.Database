import React from "react";

/**
 *  returns head section text for directors
 * @param data
 * @returns {*}
 * @constructor
 */
export const Address = ({ data }) => (
  <div>
    <address className="header__address">
      <i className="fas fa-map-marker-alt" />
      VOTE {data && data.vote_average.toString()}
    </address>
  </div>
);
