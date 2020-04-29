import { Container } from "../Container";
import React from "react";
import { Button } from "../Button";

export const Footer = () => {
  return (
    <Container className="footer">
      <Button className="burger-button">
        <i className="fas fa-bars" />
      </Button>
      <Button className="event-button">
        <i className="fas fa-plus" />
        BROWSE
      </Button>
    </Container>
  );
};
