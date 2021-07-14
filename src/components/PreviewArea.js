import React, { useEffect, useRef, useState } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea() {
  const docRef = useRef();
  const [parentWidth, setParentWidth] = useState(0);
  useEffect(() => {
    setParentWidth(docRef.current ? docRef.current.offsetWidth : 0);
  }, [docRef.current]);
  return (
    <div
      ref={docRef}
      className="flex-none h-full overflow-y-auto p-2"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CatSprite />
    </div>
  );
}
