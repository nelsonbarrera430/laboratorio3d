import React, { useState, Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";


const NotaMusical = ({ position, texturaUrl }) => {
  const notaRef = useRef();
  const texturaNota = useTexture(texturaUrl);

  // Velocidades aleatorias para que se dispersen
  const velocidadY = useMemo(() => 0.03 + Math.random() * 0.03, []);
  const velocidadX = useMemo(() => (Math.random() - 0.5) * 0.05, []);
  const velocidadZ = useMemo(() => (Math.random() - 0.5) * 0.05, []);

  useFrame(() => {
    if (notaRef.current) {
      notaRef.current.position.y += velocidadY; 
      notaRef.current.position.x += velocidadX;
      notaRef.current.position.z += velocidadZ;
    }
  });

  return (
    <sprite ref={notaRef} position={position} scale={[0.5, 0.5, 0.5]}>
      <spriteMaterial map={texturaNota} transparent={true} opacity={0.8} />
    </sprite>
  );
};

// 
const ObjetoMusical = () => {
  // 1. CARGAR TEXTURAS
  const [mapTex, alphaTex, emissiveTex] = useTexture([
    "/assets/texture1.jpg", 
    "/assets/alpha.png",    
    "/assets/texture2.jpg"  
  ]);

  
  mapTex.wrapS = mapTex.wrapT = 1000;
  alphaTex.wrapS = alphaTex.wrapT = 1000;
  emissiveTex.wrapS = emissiveTex.wrapT = 1000;

  // 2. ESTADOS
  const [notas, setNotas] = useState([]);
  const [estaSonando, setEstaSonando] = useState(false);
  const sonido = useMemo(() => new Audio("/assets/ambiente.mp3"), []);

  // 3. GENERADOR DE NOTAS 
  useEffect(() => {
    let intervalo;
    if (estaSonando) {
      intervalo = setInterval(() => {
        const idUnico = Date.now() + Math.random();
        const numeroNota = Math.floor(Math.random() * 3) + 1;
        
        setNotas((prevNotas) => [
            ...prevNotas, 
            { id: idUnico, posicion: [0, 0, 0], textura: `/assets/note${numeroNota}.png` }
        ].slice(-25)); 
      }, 250); 
    } else {
      setNotas([]); // Limpiar notas al parar
    }
    return () => clearInterval(intervalo);
  }, [estaSonando]);

  // 4. MANEJADOR DEL CLIC
  const manejarClic = (evento) => {
    evento.stopPropagation();
    if (estaSonando) {
      sonido.pause();
      sonido.currentTime = 0;
      setEstaSonando(false);
    } else {
      sonido.play().catch(e => console.error("Error al reproducir:", e));
      setEstaSonando(true);
    }
  };

  return (
    <group>
      <mesh onClick={manejarClic} position={[0, 0, 0]}>
        {}
        {}
        <cylinderGeometry args={[1.8, 1.8, 2.5, 6]} />
        
        <meshStandardMaterial 
          map={mapTex} 
          alphaMap={alphaTex} 
          transparent={true} 
          emissiveMap={emissiveTex}
          emissive="white"   
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {notas.map((nota) => (
        <NotaMusical key={nota.id} position={nota.posicion} texturaUrl={nota.textura} />
      ))}
    </group>
  );
};

// --- COMPONENTE PRINCIPAL ---
const Laboratorio3 = () => {
  return (
    <div style={{ height: "100vh", width: "100%", background: "#111" }}>
      <Canvas camera={{ position: [0, 2, 6] }}>
        <ambientLight color={"#ffffff"} intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="blue" />
        <OrbitControls makeDefault />
        <Suspense fallback={null}>
          <ObjetoMusical />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Laboratorio3;