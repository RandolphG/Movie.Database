import { Container } from "../Container";
import React from "react";
import { Button } from "../Button";

export const Footer = () => {
  return (
    <Container className="footer">
      <Button className="burger-button"></Button>
      <i className="fas fa-bars" />
      <Button className="event-button">
        <i className="fas fa-plus" />
        BROWSE
      </Button>
    </Container>
  );
};
