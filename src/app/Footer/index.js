import { Container } from "../Container";
import React from "react";
import { Button } from "../Button";

export const Footer = () => {
  return (
    <Container className="footer">
      <Button className="left-button">MENU</Button>
      <Button className="right-button">BROWSE</Button>
    </Container>
  );
};
