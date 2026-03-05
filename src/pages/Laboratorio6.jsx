import React, { useState, Suspense, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

const EscenarioHabitacion = () => {
  const { scene } = useGLTF("/assets/habitacion.glb");
  
  const videoTex = useVideoTexture("/assets/video.mp4", {
    muted: true,
    loop: true,
    start: true,
  });

  const [estaSonando, setEstaSonando] = useState(false);
  
  const sonido = useMemo(() => {
    const audio = new Audio("/assets/ambiente.mp3");
    audio.load(); 
    return audio;
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.name === "Plane001-Mesh_1") {
        
        videoTex.matrixAutoUpdate = true;
        videoTex.wrapS = videoTex.wrapT = THREE.ClampToEdgeWrapping;
        
        
        videoTex.repeat.set(0, 0); 
        videoTex.offset.set(0, 0);
        videoTex.center.set(0, 0);

        child.material = new THREE.MeshBasicMaterial({ 
          map: videoTex,
          side: THREE.DoubleSide 
        });
      }
    });
  }, [scene, videoTex]);

  const manejarClic = (evento) => {
    evento.stopPropagation();
    const nombreObjeto = evento.object.name;

    if (nombreObjeto === "PS4_Cube008") {
      if (estaSonando) {
        sonido.pause();
        sonido.currentTime = 0;
        setEstaSonando(false);
      } else {
        sonido.play()
          .then(() => {
            setEstaSonando(true);
          })
          .catch(() => {});
      }
    }

    if (nombreObjeto === "Plane001-Mesh_1") {
      videoTex.image.play();
    }
  };

  return <primitive object={scene} onClick={manejarClic} />;
};

const Laboratorio6 = () => {
  return (
    <div style={{ height: "100vh", width: "100%", background: "#111" }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        
        <Suspense fallback={null}>
          <EscenarioHabitacion />
        </Suspense>

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default Laboratorio6;