import React, { Suspense } from "react";
import s from "./3dmodel.module.scss";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Model } from "/model/Model";

const ModelComponent = () => {
  return (
    <div className={s.model}>
      <Canvas camera={{ position: [0, 2, 5], zoom: 2 }}>
        <OrbitControls />
        <color attach="background" />
        <hemisphereLight intensity={0.35} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>

      <h2>
        "Учись, развивайся. Работай в свободное время"
      </h2>
    </div>
  );
};

export default ModelComponent;
