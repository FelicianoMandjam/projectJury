import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Logout() {
  const { logout } = useContext(AuthContext);

  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
}

export default Logout;
