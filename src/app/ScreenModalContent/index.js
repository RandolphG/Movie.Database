import { Container } from "../Container";
import React from "react";
import { HeaderTitle } from "./HeaderTitle";
import { Address } from "./Address";
import { HeaderDate } from "./HeaderDate";

/**
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const ScreenModalContent = ({ data }) => (
  <div>
    <Container className="screen-modal__content">
      <HeaderTitle data={data} />
      <Address data={data} />
      <HeaderDate data={data} />
    </Container>
    <Container>
      <p>{data.overview}</p>
    </Container>
  </div>
);
