import React from "react";

function Overlay() {
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(180, 180,180,0.7)",
        zIndex: "1",
      }}
    ></div>
  );
}

export default Overlay;
