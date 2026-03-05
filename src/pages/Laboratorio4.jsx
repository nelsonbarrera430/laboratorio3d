import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

// --- SUBCOMPONENTE: GRUPO ANIMADO ---
const GrupoAnimado = ({ posicionInicial, tipoMovimiento }) => {
  const grupoRef = useRef();
  
  // color inicial
  const [color, setColor] = useState("red");

  const manejarClic = (e) => {
    e.stopPropagation();
    // Alternamos entre dos colores
    setColor(color === "orange" ? "cyan" : "orange");
  };

  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (tipoMovimiento === "rotacion") {
      
      grupoRef.current.rotation.y = t;
    } else if (tipoMovimiento === "rebote") {
      
      grupoRef.current.position.y = Math.sin(t) * 1.5;
    }
  });

  return (
    <group ref={grupoRef} position={posicionInicial} onClick={manejarClic}>
      {}
      {}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {}
      <mesh position={[1.5, 0, 0]}>
        <coneGeometry args={[0.7, 1.2, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};


const Laboratorio4 = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas shadow={true}>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        {}
        
        {/* Grupo 1: Movimiento de Rotación */}
        <GrupoAnimado posicionInicial={[-4, 0, 0]} tipoMovimiento="rotacion" />

        {/* Grupo 2: Movimiento de Rebote */}
        <GrupoAnimado posicionInicial={[4, 0, 0]} tipoMovimiento="rebote" />

        <OrbitControls />
        
        {/* Un piso  */}
        <gridHelper args={[20, 20, "white", "gray"]} position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
};

export default Laboratorio4;