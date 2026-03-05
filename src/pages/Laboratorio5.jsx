import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";


const EsferaReflectante = () => {
  const esferaRef = useRef();

  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (esferaRef.current) {
      
      esferaRef.current.rotation.y = t * 0.5;
      
      
      esferaRef.current.position.y = 1 + Math.sin(t) * 0.2;
    }
  });

  return (
    <mesh ref={esferaRef} position={[0, 1, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial 
        metalness={1}      
        roughness={0.05}  
        color="white"
      />
    </mesh>
  );
};


const Laboratorio5 = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        {}
        <OrbitControls makeDefault />
        
        <Suspense fallback={null}>
          {}
          <Environment files="/assets/cedar_bridge_2_4k.hdr" background />
          
          <EsferaReflectante />
        </Suspense>

        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={10} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
};

export default Laboratorio5;