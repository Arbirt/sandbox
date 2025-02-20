import {
  RiCheckboxBlankLine,
  RiCheckboxIndeterminateLine,
  RiCheckboxLine,
} from "@remixicon/react";
import React, { useState } from "react";

const DraggableTreeItem = ({ file }) => {
  const [check, setCheck] = useState(false);
  const handleCheck = () => {
    setCheck((prev) => !prev);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "2px 0px" }}>
      <button onClick={handleCheck} style={{backgroundColor:"transparent"}}>
        {!check ? <RiCheckboxBlankLine /> : <RiCheckboxLine style={{ color: "#f99500" }} />}
      </button>

      <h3
        style={{
          padding: "5px",
          margin: "0px 15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {file.fileName}
      </h3>
    </div>
  );
};

export default DraggableTreeItem;
