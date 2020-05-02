import { Container } from "../Container";
import React from "react";
import { Button } from "../Button";
import Search from "../Search";

export const Footer = () => {
  return (
    <Container className="footer">
      <Button className="left-button">MENU</Button>
      <Search />
      <Button className="right-button">BROWSE</Button>
    </Container>
  );
};
