import React, { useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

const Tcanvas = () => {
  const ref = useRef(null);

  return (
    <Excalidraw
      onReady={(api) => {
        console.log("✅ TestCanvas: Excalidraw is ready");
        ref.current = api;
      }}
    />
  );
};

export default Tcanvas;
