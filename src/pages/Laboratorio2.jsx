import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModeloOrangutan = ({ luzEncendida, setLuzEncendida }) => {
  const { scene } = useGLTF("/Orangutan.glb");

  const manejarClic = (evento) => {
    evento.stopPropagation(); 
    
    // malla
    const nombreMallaTocada = evento.object.name;
    
    
    const MALLA_ESPECIFICA = "Orangutan_Cube008"; 

    if (nombreMallaTocada === MALLA_ESPECIFICA) {
      setLuzEncendida(!luzEncendida);
    }
  };

  return (
    <primitive 
      object={scene} 
      onClick={manejarClic} 
      scale={2} 
      // El modelo está en la posición Y: -1
      position={[0, -1, 0]} 
    />
  );
};

// --- COMPONENTE PRINCIPAL ---
const Laboratorio2 = () => {
  const [luzExtra, setLuzExtra] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas>
        <ambientLight color={0xffffff} intensity={0.5} />

        {luzExtra && (
          <directionalLight position={[15, 15, 15]} intensity={10} color="white" />
        )}

        <OrbitControls />

        <Suspense fallback={null}>
          <ModeloOrangutan luzEncendida={luzExtra} setLuzEncendida={setLuzExtra} />
        </Suspense>

        {}
        {}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[15, 15]} /> {}
          <meshStandardMaterial color="#555555" /> {}
        </mesh>

      </Canvas>
    </div>
  );
};

export default Laboratorio2;