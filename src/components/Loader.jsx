import { Html } from "@react-three/drei";
import React from "react";

function Loader() {
  return (
    <Html>
      <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">..loading</div>
      </div>
    </Html>
  );
}

export default Loader;
