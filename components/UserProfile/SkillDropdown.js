import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 12px;

  &:hover {
    background-color: #0061d1;
  }
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px 16px;
  z-index: 1;
`;

const SkillDropdown = ({ children }) => {
  const [show, setShow] = useState(false);

  const toggleDropdown = () => {
    setShow(!show);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>Meine Skills</DropdownButton>
      <DropdownContent show={show}>{children}</DropdownContent>
    </DropdownContainer>
  );
};

export default SkillDropdown;
