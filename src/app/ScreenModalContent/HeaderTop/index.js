import React from "react";
import { HeaderDate } from "../HeaderDate";
import { HeaderTitle } from "../HeaderTitle";

/**
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const HeaderTop = ({ data }) => (
  <div className="header__top">
    <HeaderTitle data={data} />
    <HeaderDate data={data} />
  </div>
);
