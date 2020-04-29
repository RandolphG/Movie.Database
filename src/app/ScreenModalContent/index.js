import { Container } from "../Container";
import React from "react";
import { HeaderTitle } from "./HeaderTitle";
import { Subtitle } from "./Subtitle";
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
      <Subtitle data={data} />
      <HeaderDate data={data} />
    </Container>
    <Container>
      <p>{data.overview}</p>
    </Container>
  </div>
);
