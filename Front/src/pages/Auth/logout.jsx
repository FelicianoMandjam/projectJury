import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

function Logout() {
  const { logout } = useContext(AuthContext);

  const handleClick = () => {
    logout();
  };
  return (
    <>
      <Button variant="danger" onClick={handleClick}>
        {" "}
        <FontAwesomeIcon icon={faRightFromBracket} />
      </Button>
    </>
  );
}

export default Logout;
