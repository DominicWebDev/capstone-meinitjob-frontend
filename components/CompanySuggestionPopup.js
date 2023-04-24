import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Text = styled.p`
  font-size: 24px;
  margin: 0;
`;

const Image = styled.img`
  max-width: 80%;
  max-height: 60%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  border: none;
  background-color: ${(props) => (props.accept ? "green" : "red")};
  color: white;
  width: 50%;
`;

const CompanySuggestionPopup = ({ company, onAccept, onReject }) => {};

export default CompanySuggestionPopup;
