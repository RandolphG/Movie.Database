import { Container } from "../../Container";
import React from "react";
import { HeaderTop } from "../HeaderTop";
import { Address } from "../Address";

/**
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const HeaderItem = ({ data }) => {
  return (
    <Container className="header__item">
      <HeaderTop data={data} />
      <Address data={data} />
    </Container>
  );
};
