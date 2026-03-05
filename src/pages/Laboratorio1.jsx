import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

const FiguraInteractiva = () => {
  // Usamos texturas directamente de internet para que no te dé error de Vite
  const textura1 = useTexture("https://threejs.org/examples/textures/crate.gif"); 
  const textura2 = useTexture("https://threejs.org/examples/textures/brick_diffuse.jpg");

  const [mostrarTextura1, setMostrarTextura1] = useState(true);

  const alternarTextura = () => {
    setMostrarTextura1(!mostrarTextura1);
  };

  return (
    <mesh onClick={alternarTextura}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={mostrarTextura1 ? textura1 : textura2} />
    </mesh>
  );
};

const Laboratorio1 = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls />
        
        <Suspense fallback={null}>
          <FiguraInteractiva />
        </Suspense>

      </Canvas>
    </div>
  );
};

export default Laboratorio1;