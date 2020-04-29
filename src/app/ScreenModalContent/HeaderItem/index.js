import { Container } from "../../Container";
import React from "react";
import { HeaderTop } from "../HeaderTop";
import { Subtitle } from "../Subtitle";

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
      <Subtitle data={data} />
    </Container>
  );
};
